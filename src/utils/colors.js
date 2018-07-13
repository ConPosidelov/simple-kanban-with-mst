const colors = {
  Yellow: {
    mainColor: '#CDCD00',
    backColor: '#FAFAD2'
  },
  Green: {
    mainColor: '#43CD80',
    backColor: '#C1FFC1'
  },
  Blue: {
    mainColor: '#1C86EE',
    backColor: '#BFEFFF'
  },
  Red: {
    mainColor: '#CD0000',
    backColor: '#FFA07A'
  },
  Purple: {
    mainColor: '#7D26CD',
    backColor: '#FFBBFF'
  },
  Cyan: {
    mainColor: '#00CDCD',
    backColor: '#00FFFF'
  },
};

export const getColor = (key) => colors[key];
export const setColors = (key, { mainColor, backColor }) => {
  colors[key] = {
    mainColor,
    backColor
  }
};

export const getColorsArr = () => Object.keys(colors);