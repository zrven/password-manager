const style = (theme) => ({
  container: {
    flex: 1,
    backgroundColor:
      theme['background-basic-color-1'] === '#222B45'
        ? '#000000'
        : theme['background-basic-color-1'],
  },
  contentContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    flexDirection: 'column',
  },
  screenPadding: {
    padding: 15,
  },
  inputView: {
    paddingTop: 15,
  },
  input: {
    paddingTop: 5,
  },
  bar: {
    marginRight: 15,
  },
  subjectView: {
    margin: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  view: {
    flexDirection: 'column',
  },
  icon: {
    width: 32,
    height: 32,
    textAlignVertical: 'center',
    marginRight: 6,
    color: theme['color-basic-100'],
  },
  subContainer: {
    padding: 10,
  },
  text: {
    padding: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paddingTwenty: {
    padding: 20,
  },
  link: {
    marginTop: 15,
    color: theme['color-primary-hover'],
  },

  cardContainer: {
    height: 65,
  },
  settingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  formContainer: {
    //padding: 30,
    margin: 30,
  },
  headerContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    //flexDirection: 'row',
    marginBottom: 15,
  },

  sbar: {
    marginRight: 30,
  },
  submitButton: {
    // marginLeft: 40,
    // marginRight: 40,
  },
  divider: {
    margin: 10,
    //borderColor: '#000000',
    //borderWidth: 0.15,
    //width: 75,
  },
  signupText: {
    color: theme['color-primary-hover'],
  },
  signupTextContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-end',
  },
  sinput: {
    paddingTop: 5,
  },
});

export default style;
