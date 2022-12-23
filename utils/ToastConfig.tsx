import { Text, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


export const toastConfig = {
  
  customToast: ({ text1, text2, props }: any) => (
    <View  style={{ marginTop: 10, height: 80, width: '100%', backgroundColor: '#4287f5', zIndex: 100, position: 'absolute', padding: 10, }}>
    <View style={{flexDirection: 'row', justifyContent:'space-between', }}>
      <View>
            <Text style={{padding: 5, fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>{text1}</Text>
            <Text style={{padding: 5, fontSize: 15, color: '#ffffff'}}>{text2}</Text>
      </View>
      <SimpleLineIcons style={{ marginTop: 10, marginRight: 10, }} name='basket' color='#ffffff' size={26} />
    </View>

    </View>
  )
};