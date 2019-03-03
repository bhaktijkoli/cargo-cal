window.startCalculate = (container, tyreTypes) => {
  console.log(container);
  // Volume checking
  let volume = {};
  volume.container = container.volume;
  volume.tyres = 0;
  // Compression ratio
  container.height += container.height * 1.5/100;
  // Sorting
  tyreTypes = sortTyres(tyreTypes);
  console.log("Type Tyres", tyreTypes);
  // Creating array of tyres
  let tyres = [];
  tyreTypes.forEach(el => {
    for(var i=0;i<el.number;i++) {
      var tyre = {
        diameter: el.diameter,
        width: el.width,
        weight: el.weight,
        model: el.model,
        color: el.color,
        volume: el.volume,
        normal: el.normal,
        size: {
          x: 0,
          y: 0,
          z: 0,
        },
        type: 0,
      }
      volume.tyres += el.volume;
      tyres.push(tyre);
    }
  });
  // Start arrangement
  let layers = [];
  // Horizntal Loading
  addHorizontalLayers(container, tyres, layers, 3);
  tyres = sortTyresByNormal(tyres);
  updateHOrizontalLayersForNormals(container, tyres, layers);
  console.log("Exit horizonal normal");
  // Cross Loading
  addCrossLoadingLayers(container, tyres, layers);
  console.log("Container Size");
  console.log(container);
  console.log("Final result:");
  console.log(layers);
  console.log("Remaing");
  console.log(tyres);
  console.log("Volume");
  console.log(volume);
  return {
    layers: layers,
    volume: volume,
  }
}

/*
ARRANGEMENT FUNCTIONS
*/
const addHorizontalLayers = (container, tyres, layers, max=0) => {
  let pos = {x:0, y:0, z:0};
  var isCompleted = false;
  horizontalArrangement:
  while(!isCompleted) {
    let layer = [];
    var isLayerCompleted = false;
    while(!isLayerCompleted) {
      addHorizontalRow(container, tyres, layer, pos)
      if(layer.length == max) {
        layers.push(layer);
        isLayerCompleted = true;
      }
    }
    if(tyres.length == 0) break horizontalArrangement;
    if(layer[0][0]) {
      pos.y += layer[0][0].diameter;
      if(pos.y + tyres[0].diameter > container.length) {
        isCompleted = true;
      }
    }
  }
}
const updateHOrizontalLayersForNormals = (container, tyres, layers) => {
  console.log("Started");
  let pos = {x:0, y:0, z:0};
  var isCompleted = false;
  var layerIndex = 0;
  while(!isCompleted) {
    let layer = layers[layerIndex];
    console.log("layer index", layerIndex);
    if(!layer) return;
    var isLayerCompleted = false;
    while(!isLayerCompleted) {
      console.log("Y", pos.y);
      pos.y = getHorizontalY(layer);
      var tyre = tyres[0];
      if(tyre) {
        if(tyre.normal == false) return;
        console.log("Tyre is normal");
        if(pos.y + tyre.width > container.height) {
          layerIndex++;
          isLayerCompleted = true;
        }
      }
      console.log("Adding row");
      addHorizontalRow(container, tyres, layer, pos)
    }
  }
}

const addCrossLoadingLayers = (container, tyres, layers) => {
  var tyre = tyres[0];
  if(tyre) {
    if(tyre.normal) return;
  }
  isCompleted = false;
  layerIndex = 0;
  pos = {x:0, y:0, z:0}
  crossLoading:
  while(!isCompleted) {
    var layer = layers[layerIndex];
    pos.y = getHorizontalY(layer);
    if(!layer) break crossLoading;
    var firstRow = true;
    var isLayerCompleted = false;
    while(!isLayerCompleted) {
      if(firstRow) {
        addFirstCrossRow(container, tyres, layer, pos)
        firstRow = false;
      } else {
        addCrossRow(container, tyres, layer, pos)
      }
      if(tyres.length == 0) break crossLoading;
      if(pos.y + tyres[0].width > container.height) {
        pos.y = 0;
        isLayerCompleted = true;
        layerIndex++;
      }
    }
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
    if(tyres.length == 0) {
      layer.push(row);
      return;
    }
    var tyre = tyres[0];
    pos.x += tyre.diameter;
    tyre.type = 0;
    tyre.size.x = tyre.diameter;
    tyre.size.y = tyre.width;
    tyre.size.z = tyre.diameter;
    row.push(tyre);
    tyres.shift();
    if(tyres.length == 0) {
      layer.push(row);
      return;
    }
    if(pos.x + tyres[0].diameter > container.width) {
      layer.push(row);
      isRowCompleted = true;
    }
  }
}
/*
CROSS LOADING FUNCTIONs
*/
const addFirstCrossRow = (container, tyres, layer, pos) => {
  let row = [];
  var isRowCompleted = false;
  firstTyre = true;
  pos.x = 0;
  while(!isRowCompleted) {
    if(tyres.length == 0) {
      break;
    }
    var tyre = tyres[0];
    tyre.type = 1;
    var angle = 20 * (Math.PI/180);
    if(firstTyre) {
      tyre.size.x = tyre.diameter;
      firstTyre = false;
      tyre.type = 0;
    } else {
      tyre.size.x = tyre.diameter*0.7;
    }
    pos.x += tyre.size.x;
    tyre.size.y = tyre.width + tyre.width*0.3;
    tyre.size.z = tyre.diameter;
    row.push(tyre);
    tyres.shift();
    if(tyres.length == 0) {
      break;
    }
    let nextX = tyres[0].diameter*0.7;
    if(pos.x + nextX > container.width) {
      pos.y += tyre.size.y
      isRowCompleted = true;
    }
  }
  if(!layer) return;
  layer.push(row);
}
const addCrossRow = (container, tyres, layer, pos) => {
  let row = [];
  var isRowCompleted = false;
  pos.x = 0;
  while(!isRowCompleted) {
    if(tyres.length == 0) {
      break;
    }
    var tyre = tyres[0];
    tyre.type = 1;
    tyre.size.x = tyre.diameter*0.7;
    tyre.size.y = tyre.width + tyre.width*0.3;
    pos.x += tyre.size.x;
    row.push(tyre);
    tyres.shift();
    if(tyres.length == 0) {
      break;
    }
    let nextX = tyres[0].diameter*0.7;
    if(pos.x + nextX > container.width) {
      pos.y += tyre.size.y;
      isRowCompleted = true;
    }
  }
  if(!layer) return;
  layer.push(row);
}

const getHorizontalY = (layer) => {
  if(!layer) return 0;
  let y = 0;
  layer.forEach(el => {
    if(el[0]) {
      y += el[0].size.y;
    }
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
const sortTyresByNormal = (arr) => {
  var len = arr.length,
  i, j, stop;
  for (i=0; i < len; i++){
    for (j=0, stop=len-i; j < stop; j++){
      if(arr[j] && arr[j+1]) {
        if (arr[j].normal == true) {
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
