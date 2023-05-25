import { StyleSheet, Dimensions, Platform } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfefb',
    paddingTop: Platform.OS === 'android' ? 35 : Platform.OS === 'ios' ? 33 : 0, 
  },
  signcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#999',
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1E6738',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginTop: 20,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,    
     fontFamily: 'PlayfairDisplaySC-Bold',  
  },
  buttonDisabled: {
    alignItems: 'center',
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#ccc',
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImagePlaceholderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  header: {
    padding: 10,
    backgroundColor: '#a2e4e4',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20
  },
  headerText:{
    textAlign: 'center',
    fontSize: 20, 
    paddingTop: 3,
    fontFamily: 'PlayfairDisplaySC-Bold',
  },
  headerSmall: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlayfairDisplaySC-Bold',
    fontSize: 14,
    padding: 10, 
  },
  content: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: 30,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontFamily: 'PlayfairDisplaySC-Bold',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonShop: {
    backgroundColor: '#440000',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
  },
  buttonTextShop: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  }, 
  textFooter: {
    fontFamily: 'PlayfairDisplay-Regular',
    textAlign: 'center',
    marginTop: 5,
    color: '#fff'
  },
  text: {
    fontSize: 14,
    fontFamily: 'PlayfairDisplay-Regular',
    textAlign: 'center',
    marginTop: 5,
  },
  textCategories: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay-Bold',
    textAlign: 'center',
    marginTop: 5,
 },
 productText:{
   fontFamily: 'PlayfairDisplaySC-Bold',
   fontSize: 22,  
   marginTop: 5,
    paddingRight: 10, 
  },
  button: {
    borderWidth: 1,
    borderColor: '#111',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'PlayfairDisplaySC-Bold',
    textAlign: 'center', 
  },
  image: {
    width: screenWidth,
    height: 300, 
  },
  topText: {  /* Added topText style */
    fontFamily: 'PlayfairDisplay-Bold',
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 60,
    paddingTop: 5,
    paddingBottom: 5,
  },
  sizeStyle:{
    marginLeft: 10,
    backgroundColor: 'black',
    fontFamily: 'PlayfairDisplaySC-Bold',
    color: 'white',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    fontSize: 20,
    paddingVertical: 2,
    borderRadius: 5
  },
  badge:{
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
    borderRadius: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  }
})
