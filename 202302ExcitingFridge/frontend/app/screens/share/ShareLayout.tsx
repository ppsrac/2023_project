import React from 'react';
import {ImageBackground, View} from 'react-native';
import {styles} from "@/styles/styles";
import BottomNavigator from "@/components/BottomNavigator";
import TopNavigator from "@/components/TopNavigator";

interface props {
  children: any;
  title: string;
  optionTitle?: string;
  optionFunction?: Function;
}


const ShareLayout = ({children, title, optionTitle, optionFunction}: props) => {

  return (
    <View style={[styles.layout]}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <TopNavigator title={title} optionTitle={optionTitle} optionFunction={optionFunction}/>
        {children}
        <View style={{height: 80}}></View>
        <BottomNavigator now='share'/>
      </ImageBackground>
    </View>
  )
}

export default ShareLayout;
