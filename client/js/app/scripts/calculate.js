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
      let row = [];
      var isRowCompleted = false;
      pos.x = 0;
      while(!isRowCompleted) {
        var tyre = tyres[0];
        row.push(tyre);
        tyres.shift();
        pos.x += tyre.diameter;
        if(tyres.length == 0) {
          break horizontalArrangement;
        }
        if(pos.x + tyres[0].diameter > container.width) {
          layer.push(row);
          isRowCompleted = true;
        }
      }
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
    var firstTyre = false;
    var firstRow = false;
    var isLayerCompleted = false;
    pos.y = getHorizontalY(layer);
    while(!isLayerCompleted) {
      let row = [];
      var isRowCompleted = false;
      pos.x = 0;
      while(!isRowCompleted) {
        var tyre = tyres[0];
        row.push(tyre);
        tyres.shift();
        var angle = 20 * (Math.PI/180);
        if(firstTyre) {
          pos.x += Math.cos(angle) * tyre.diameter;
          firstTyre = true;
        } else {
          pos.x += Math.cos(angle) * (3/4 * tyre.diameter);
        }
        if(tyres.length == 0) {
          break crossLoading;
        }
        if(pos.x + tyres[0].diameter > container.width) {
          if(!layer) break crossLoading;
          layer.push(row);
          pos.y += Math.sin(angle) * tyre.diameter + Math.sin(70) * tyre.width;
          if(!firstRow) {
            pos.y += Math.sin(angle) + tyre.diameter;
          }
          isRowCompleted = true;
        }
      }
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
