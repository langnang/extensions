let cardWidth = {};

cardWidth.defaultValues = [
  {
    text: '40%',
    value: '40%',
    vw: '8vw',
    px: '154px',
  },
  {
    text: '50%',
    value: '50%',
    vw: '10vw',
    px: '192px',
  },
  {
    text: '60%',
    value: '60%',
    vw: '12vw',
    px: '230px',
  },
  {
    text: '70%',
    value: '70%',
    vw: '14vw',
    px: '269px',
  },
  {
    text: '80%',
    value: '80%',
    vw: '16vw',
    px: '307px',
  },
  {
    text: '90%',
    value: '90%',
    vw: '18vw',
    px: '346px',
  },
  {
    text: '100%',
    value: '100%',
    vw: '20vw',
    px: '384px',
  },
  {
    text: '110%',
    value: '110%',
    vw: '22vw',
    px: '422px',
  },
  {
    text: '120%',
    value: '120%',
    vw: '24vw',
    px: '461px',
  },
  {
    text: '130%',
    value: '130%',
    vw: '26vw',
    px: '499px',
  },
  {
    text: '140%',
    value: '140%',
    vw: '28vw',
    px: '538px',
  },
  {
    text: '150%',
    value: '150%',
    vw: '30vw',
    px: '576px',
  },
  {
    text: '160%',
    value: '160%',
    vw: '32vw',
    px: '614px',
  },
  {
    text: '170%',
    value: '170%',
    vw: '34vw',
    px: '653px',
  },
  {
    text: '180%',
    value: '180%',
    vw: '36vw',
    px: '691px',
  },
  {
    text: '190%',
    value: '190%',
    vw: '38vw',
    px: '729px',
  },
  {
    text: '200%',
    value: '200%',
    vw: '40vw',
    px: '768px',
  },
];

cardWidth.cardWidthChange = (text) => {
  const widthList = cardWidth.defaultValues;
  for (let i = 0, len = widthList.length; i < len; i++) {
    if (text === widthList[i].text) {
        return widthList[i].px;
    }
  }
};

export default cardWidth;
