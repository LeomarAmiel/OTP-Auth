import React, { Component } from 'react';
import { Animated, View, StyleSheet, PanResponder, LayoutAnimation, UIManager, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_TRESHOLD = SCREEN_WIDTH * 0.5;

class Deck extends Component {
    static defaultProps = {
        onSwipeLeft: () => {},
        onSwipeRight: () => {},
    }

    constructor(props){
        super(props);
        this.state = {
            index: 0
        }
        this.position = new Animated.ValueXY();
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gesture) => {
                this.position.setValue({x: gesture.dx, y: gesture.dy});
            },
            onPanResponderRelease: (evt, gesture) => {
                if(gesture.dx>SWIPE_TRESHOLD){
                    this.forceSwipe('right');
                }
                else if(gesture.dx < -SWIPE_TRESHOLD){
                    this.forceSwipe('left');
                }
                else {
                    this.resetPosition();
                }
            }
        })
    }

    componentWillUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        let x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
        Animated.timing(this.position, {
            toValue: {x, y: 0},
            duration: 100
        }).start(() => {this.onSwipeComplete(direction)});
    }

    onSwipeComplete(direction){
        const { onSwipeLeft, onSwipeRight, data} = this.props;
        const item = data[this.state.index];

        this.position.setValue({x: 0, y: 0} );
        this.setState({ index: this.state.index + 1});

    }

    getCardStyle () {
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            outputRange: ['-70deg', '0deg', '70deg']
        })
        
        return {
            ...this.position.getLayout(),
            transform: [{ rotate }]
        }   
    }

    resetPosition(){
        Animated.spring(this.position, {
            toValue: {x: 0, y: 0}
        }).start();
    }

    renderCards(){
        if(this.state.index>=this.props.data.length){
            return this.props.onRenderNoMoreCards();
        }
        return this.props.data.map((val, index) => {
            if(index < this.state.index) {
                return null;
            }
            if(index===this.state.index){
                return (
                    <Animated.View 
                    key={index}
                        style = {[this.getCardStyle(), styles.cardStyle]}
                        {...this.panResponder.panHandlers}>
                        {this.props.onRenderCard(val, index)}
                    </Animated.View>
                )
            }
            return (
                <Animated.View style={[styles.cardStyle, {top: 10 * (index - this.state.index)}]} key={index}>    
                    {this.props.onRenderCard(val)}
                </Animated.View>    
            );
        }).reverse();
    }
    
    render(){
        return(
            <Animated.View>
                {this.renderCards()}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        width: SCREEN_WIDTH-20,
        position: 'absolute',
        backgroundColor: 'white',
        elevation: 4,
        borderWidth: 1
    }
})

export default Deck;