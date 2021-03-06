const styles = theme => {
  return {
    container: {
      height: '100%'
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'space-between',
      // alignItems: 'center'
    },
    content: {
      padding: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      display: 'flex',
      maxWidth: '400px',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 'auto'
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      marginLeft: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 2
    },
    select: {
      minWidth: '100px',
      maxWidth: '180px'
    },
    recordRow: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: theme.spacing.unit * 2
    }
  };
};

export default styles;
