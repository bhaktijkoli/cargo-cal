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
  let layers = [];
  // Start arrangement
  let pos = {x:0, y:0, z:0};
  var isCompleted = false;
  main:
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
          break main;
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
  console.log("Final result:");
  console.log(layers);
  console.log("Remaing");
  console.log(tyres);
  return {
    layers: layers
  }
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
        if (arr[j].weight > arr[j+1].weight) {
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
