import React from 'react';
import {ImageBackground, Text, TouchableWithoutFeedback, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { styles } from '@/styles/styles';
import {TEXT_COLOR} from "@/assets/colors/colors";


interface props {
  item: any;

}
const ShareItem = ({item}: props) => {
  const navigation = useNavigation();

  return (
    <View style={[{width: '90%', borderWidth: 1, height: 100, marginBottom: 10, borderRadius: 20, borderColor: '#B2CFFF'}]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('ShareDetail', {sharePostId: item.sharePostId, userProfileImageUrl: item.userProfileImageUrl})}>
        <View style={[{flex: 1, flexDirection: 'row'}]}>
          <View style={[{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={{borderRadius: 16, borderWidth: 1, height: 80, width: 80}}>
              <ImageBackground source={{uri: item.thumbnail}}
                               resizeMode={"cover"}
                               style={{width:'100%', height:'100%'}}
                               imageStyle={{borderRadius: 16}}
              />
            </View>
          </View>
          <View style={[{flex: 1}]}>
            <View style={[{paddingTop: 15, paddingHorizontal: 10}]}>
              <Text style={[styles.font, {fontSize: 20}]} numberOfLines={1}>{item.title}</Text>
            </View>
            <View style={[{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 10}]}>
              <View style={[{flex: 1, flexDirection: 'row'}]}>
                <View style={[{width: 40, height: 40, borderWidth: 1, borderRadius: 99}]}>
                  <View>
                    <ImageBackground source={{uri: item.userProfileImageUrl}}
                                     style={{width:'100%', height:'100%'}}
                                     imageStyle={{borderRadius:99, borderWidth:1, borderColor:TEXT_COLOR}}
                    />
                  </View>
                </View>
                <View style={{paddingLeft: 5, justifyContent: 'flex-end'}}>
                  <Text style={[styles.font, {fontSize: 18, color: '#848A94'}]}>{item.nickname}</Text>
                </View>
              </View>
              <View style={[{justifyContent: 'flex-end'}]}>
                <Text style={[styles.font, {fontSize: 18, color: '#848A94'}]}>{item.createTime}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ShareItem;
