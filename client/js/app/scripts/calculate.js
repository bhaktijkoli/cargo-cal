window.startCalculate = (container, tyreTypes) => {
  // Sorting
  tyreTypes = sortTyres(tyreTypes);
  // Creating array of tyres
  let tyres = [];
  tyreTypes.forEach(el => {
    var tyre = {
      diameter: el.diameter,
      width: el.width,
      weight: el.weight,
      model: el.model,
      color: el.color,
      size: {
        x: 0,
        y: 0,
        z: 0,
      }
    }
    for(var i=0;i<el.number;i++) {
      tyres.push(tyre);
    }
  });

  // Start arrangement
  let layers = [];
  // Horizntal Loading
  let pos = {x:0, y:0, z:0};
  var isCompleted = false;
  horizontalArrangement:
  while(!isCompleted) {
    let layer = [];
    var isLayerCompleted = false;
    while(!isLayerCompleted) {
      addHorizontalRow(container, tyres, layer, pos)
      if(layer.length == 3) {
        layers.push(layer);
        isLayerCompleted = true;
      }
    }
    pos.y += layer[0][0].diameter;
    if(pos.y + tyres[0].diameter > container.length) {
      isCompleted = true;
    }
  }
  // Cross Loading
  isCompleted = false;
  layerIndex = 0;
  pos = {x:0, y:0, z:0}
  crossLoading:
  while(!isCompleted) {
    var layer = layers[layerIndex];
    var firstRow = true;
    var isLayerCompleted = false;
    pos.y = getHorizontalY(layer);
    while(!isLayerCompleted) {
      if(firstRow) {
        addFirstCrossRow(container, tyres, layer, pos)
        firstRow = false;
      } else {
        addCrossRow(container, tyres, layer, pos)
      }
      if(tyres.length == 0) break crossLoading;
      var tyre = tyres[0];
      var angle = 20 * (Math.PI/180);
      if(pos.y + (Math.sin(angle) * tyre.diameter) > container.height) {
        isLayerCompleted = true;
        layerIndex++;
      }
    }
  }
  console.log("Final result:");
  console.log(layers);
  console.log("Remaing");
  console.log(tyres);
  return {
    layers: layers
  }
}

/*
HORIZONTAL FUNCTION
*/
const addHorizontalRow = (container, tyres, layer, pos) => {
  let row = [];
  var isRowCompleted = false;
  pos.x = 0;
  while(!isRowCompleted) {
    var tyre = tyres[0];
    pos.x += tyre.diameter;
    tyre.size.x = tyre.diameter;
    tyre.size.y = tyre.width;
    tyre.size.z = tyre.diameter;
    row.push(tyre);
    tyres.shift();
    if(tyres.length == 0) return;
    if(pos.x + tyres[0].diameter > container.width) {
      layer.push(row);
      isRowCompleted = true;
    }
  }
}

const addFirstCrossRow = (container, tyres, layer, pos) => {
  let row = [];
  var isRowCompleted = false;
  firstTyre = false;
  pos.x = 0;
  while(!isRowCompleted) {
    var tyre = tyres[0];
    var angle = 20 * (Math.PI/180);
    if(firstTyre) {
      tyre.size.x = Math.cos(angle) * tyre.diameter;
      firstTyre = true;
    } else {
      tyre.size.x = Math.cos(angle) * (3/4 * tyre.diameter);
    }
    pos.x += tyre.size.x;
    tyre.size.y = Math.sin(angle) * tyre.diameter + Math.sin(70) * tyre.width;
    tyre.size.z = tyre.diameter;
    row.push(tyre);
    tyres.shift();
    if(tyres.length == 0) {
      return;
    }
    if(pos.x + tyres[0].diameter > container.width) {
      if(!layer) return;
      layer.push(row);
      pos.y += tyre.size.y
      isRowCompleted = true;
    }
  }
}
const addCrossRow = (container, tyres, layer, pos) => {
  let row = [];
  var isRowCompleted = false;
  pos.x = 0;
  while(!isRowCompleted) {
    var tyre = tyres[0];
    row.push(tyre);
    tyres.shift();
    var angle = 20 * (Math.PI/180);
    pos.x += Math.cos(angle) * (3/4 * tyre.diameter);
    tyre.size.x = Math.cos(angle) * (3/4 * tyre.diameter);
    if(tyres.length == 0) {
      return;
    }
    if(pos.x + tyres[0].diameter > container.width) {
      if(!layer) return;
      layer.push(row);
      pos.y += Math.sin(angle) * tyre.diameter + Math.sin(70) * tyre.width;
      pos.y += Math.sin(angle) + tyre.diameter;
      isRowCompleted = true;
    }
  }
}

const getHorizontalY = (layer) => {
  if(!layer) return 0;
  let y = 0;
  layer.forEach(el => {
    y += el[0].width;
  })
  return y;
}

/*
SORT FUNCTION
*/
const sortTyres = (arr) => {
  var len = arr.length,
  i, j, stop;
  for (i=0; i < len; i++){
    for (j=0, stop=len-i; j < stop; j++){
      if(arr[j] && arr[j+1]) {
        if (arr[j].weight < arr[j+1].weight) {
          swap(arr, j, j+1);
        }
      }
    }
  }

  return arr;
}

const swap = (arr, first_Index, second_Index) => {
  var temp = arr[first_Index];
  arr[first_Index] = arr[second_Index];
  arr[second_Index] = temp;
}
