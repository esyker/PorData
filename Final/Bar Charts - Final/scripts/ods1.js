




/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}





var tooltip_background ="#e5243b";

function init() {

  $('select').on('change', function() {
    dataChange(this.value, 1);
  });
 
  var data_file = "/data/data_final.csv"; 
  d3.csv(data_file).then((data) =>{
    dataSet = data;
    dataSet = data.filter(function (d) {
      if (d.ODS == "1" && d.Símbolo != "Valor não disponível"){
        return d;
      }
    });


    create_Barplot1(dataSet, false);

   })
   .catch((error) => {
    console.log(error);
  });

// basic paging logic to demo the buttons
var pr = document.querySelector( '.paginate.left' );
var pl = document.querySelector( '.paginate.right' );

pr.onclick = slide.bind( this, -1 );
pl.onclick = slide.bind( this, 1 );


var index = 0, total = 6;

function slide(offset) {
  
  console.log("O indice é: " + String(index))
  console.log("O offset é: " + String(offset))

  if(index == 0 && offset == -1)
  {
    index = total - 1;
  }
  else if(index == (total-1) && offset == 1)
  {
    index = 0
  }
  else{
    index = Math.min( Math.max( index + offset, 0 ), total - 1 );
  }
  


  document.querySelector( '.counter' ).innerHTML = ( index + 1 ) + ' / ' + total;

}

slide(0);


function cycleVisibility(ev) {
  ev.preventDefault();

  // get a nodeList of all the divs
  const nlist = document.querySelectorAll('div.cycle-hide');

  for (let i = 0; i < nlist.length; i++) {

    // if div is active, that class name will be removed
    if (nlist[i].className.includes('active')) {
      nlist[i].classList.remove('active');

      // check wheter you're at the end of nodeList 
      const nextIndex = i < nlist.length - 1 ? i + 1 : 0;

      // and add the class that makes next (or first) div visible
      nlist[nextIndex].classList.add('active');
      div_ativa = document.querySelector('.active').id
      div_ativa = String("#" + div_ativa)
      console.log(div_ativa)
      if(div_ativa == "#my_dataviz1")
      {

        /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
        $('#my_select option:first').prop('selected',true);

        d3.select("#my_dataviz1").selectAll("svg").remove();
        create_Barplot1(dataSet, false);

        
        var x1 = document.getElementById("container__textSub_ODS_Title6");
        var x2 = document.getElementById("container__textSub_ODS_Text6");
        var x3 = document.getElementById("container__textSub_ODS_Title1");
        var x4 = document.getElementById("container__textSub_ODS_Text1");
        var x5 = document.getElementById("imgSUB_ODS1_6");
        var x6 = document.getElementById("imgSUB_ODS1_1");



        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";


        x3.style.removeProperty('left');
        x3.style.right="-100px";
        x3.style.animation="slide1 2s forwards";

        x4.style.removeProperty('left');
        x4.style.right="-100px";
        x4.style.animation="slide1 2s forwards";

        x6.style.removeProperty('left');
        x6.style.right="-100px";
        x6.style.animation="slide1 2s forwards";


        x3.style.removeProperty('bottom');
        x4.style.removeProperty('bottom');
        x6.style.removeProperty('bottom');


      }
      else if(div_ativa == "#my_dataviz2")
      {

        /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
        $('#my_select option:first').prop('selected',true);


        d3.select("#my_dataviz2").selectAll("svg").remove();
        create_Barplot2(dataSet, false);


        var x1 = document.getElementById("container__textSub_ODS_Title1");
        var x2 = document.getElementById("container__textSub_ODS_Text1");
        var x3 = document.getElementById("container__textSub_ODS_Title2");
        var x4 = document.getElementById("container__textSub_ODS_Text2");

        var x5 = document.getElementById("imgSUB_ODS1_1");
        var x6 = document.getElementById("imgSUB_ODS1_2");


        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";     

        x5.style.display="none";
        x6.style.display="inline";


        x3.style.removeProperty('left');
        x3.style.right="-100px";
        x3.style.animation="slide1 2s forwards";

        x4.style.removeProperty('left');
        x4.style.right="-100px";
        x4.style.animation="slide1 2s forwards";

        x6.style.removeProperty('left');
        x6.style.right="-100px";
        x6.style.animation="slide1 2s forwards";



      }else if(div_ativa == "#my_dataviz3")
      {
         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz3").selectAll("svg").remove();
         create_Barplot3(dataSet, false);


        var x1 = document.getElementById("container__textSub_ODS_Title2");
        var x2 = document.getElementById("container__textSub_ODS_Text2");
        var x3 = document.getElementById("container__textSub_ODS_Title3");
        var x4 = document.getElementById("container__textSub_ODS_Text3");
        var x5 = document.getElementById("imgSUB_ODS1_2");
        var x6 = document.getElementById("imgSUB_ODS1_3");


        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";
        


        x3.style.removeProperty('left');
        x3.style.right="-100px";
        x3.style.animation="slide1 2s forwards";

        x4.style.removeProperty('left');
        x4.style.right="-100px";
        x4.style.animation="slide1 2s forwards";

        x6.style.removeProperty('left');
        x6.style.right="-100px";
        x6.style.animation="slide1 2s forwards";


      }
      else if(div_ativa == "#my_dataviz4")
      {
         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz4").selectAll("svg").remove();
         create_Barplot4(dataSet, false);


        var x1 = document.getElementById("container__textSub_ODS_Title3");
        var x2 = document.getElementById("container__textSub_ODS_Text3");
        var x3 = document.getElementById("container__textSub_ODS_Title4");
        var x4 = document.getElementById("container__textSub_ODS_Text4");
        var x5 = document.getElementById("imgSUB_ODS1_3");
        var x6 = document.getElementById("imgSUB_ODS1_4");





        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";

        x3.style.removeProperty('left');
        x3.style.right="-100px";
        x3.style.animation="slide1 2s forwards";

        x4.style.removeProperty('left');
        x4.style.right="-100px";
        x4.style.animation="slide1 2s forwards";

        x6.style.removeProperty('left');
        x6.style.right="-100px";
        x6.style.animation="slide1 2s forwards";


      }
      else if(div_ativa == "#my_dataviz5")
      {
         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz5").selectAll("svg").remove();
         create_Barplot5(dataSet, false);


        var x1 = document.getElementById("container__textSub_ODS_Title4");
        var x2 = document.getElementById("container__textSub_ODS_Text4");
        var x3 = document.getElementById("container__textSub_ODS_Title5");
        var x4 = document.getElementById("container__textSub_ODS_Text5");
        var x5 = document.getElementById("imgSUB_ODS1_4");
        var x6 = document.getElementById("imgSUB_ODS1_5");



        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";


        x3.style.removeProperty('left');
        x3.style.right="-100px";
        x3.style.animation="slide1 2s forwards";

        x4.style.removeProperty('left');
        x4.style.right="-100px";
        x4.style.animation="slide1 2s forwards";

        x6.style.removeProperty('left');
        x6.style.right="-100px";
        x6.style.animation="slide1 2s forwards";

      }
      else if(div_ativa == "#my_dataviz6")
      {
         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz6").selectAll("svg").remove();
         create_Barplot6(dataSet, false);

        var x1 = document.getElementById("container__textSub_ODS_Title5");
        var x2 = document.getElementById("container__textSub_ODS_Text5");
        var x3 = document.getElementById("container__textSub_ODS_Title6");
        var x4 = document.getElementById("container__textSub_ODS_Text6");
        var x5 = document.getElementById("imgSUB_ODS1_5");
        var x6 = document.getElementById("imgSUB_ODS1_6");



        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";


        x3.style.removeProperty('left');
        x3.style.right="-100px";
        x3.style.animation="slide1 2s forwards";

        x4.style.removeProperty('left');
        x4.style.right="-100px";
        x4.style.animation="slide1 2s forwards";

        x6.style.removeProperty('left');
        x6.style.right="-100px";
        x6.style.animation="slide1 2s forwards";
        

      }

      // exit the loop
      break;
    }
  }
}

function cycleVisibilityBack(ev) {
  ev.preventDefault();

  // get a nodeList of all the divs
  const nlist = document.querySelectorAll('div.cycle-hide');

  console.log(nlist);

  for (let i = nlist.length-1; i >= 0; i--) {

    // if div is active, that class name will be removed
    if (nlist[i].className.includes('active')) {
      nlist[i].classList.remove('active');

      // check wheter you're at the end of nodeList 
      const nextIndex = i > 0 ? i - 1 : nlist.length-1;

      // and add the class that makes next (or first) div visible
      nlist[nextIndex].classList.add('active');
      div_ativa = document.querySelector('.active').id
      div_ativa = String("#" + div_ativa)


      if(div_ativa == "#my_dataviz1")
      {

         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz1").selectAll("svg").remove();
         create_Barplot1(dataSet, false);

        var x1 = document.getElementById("container__textSub_ODS_Title2");
        var x2 = document.getElementById("container__textSub_ODS_Text2");
        var x3 = document.getElementById("container__textSub_ODS_Title1");
        var x4 = document.getElementById("container__textSub_ODS_Text1");
        var x5 = document.getElementById("imgSUB_ODS1_2");
        var x6 = document.getElementById("imgSUB_ODS1_1");


        
        x3.style.removeProperty('right');
        x3.style.left="-100px";
        x3.style.animation="slide 2s forwards";

        x4.style.removeProperty('right');
        x4.style.left="-100px";
        x4.style.animation="slide 2s forwards";

        x6.style.removeProperty('right');
        x6.style.left="-100px";
        x6.style.animation="slide 2s forwards";





        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";

        
        

      }
      else if(div_ativa == "#my_dataviz2")
      {

         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz2").selectAll("svg").remove();
         create_Barplot2(dataSet, false);

        var x1 = document.getElementById("container__textSub_ODS_Title3");
        var x2 = document.getElementById("container__textSub_ODS_Text3");
        var x3 = document.getElementById("container__textSub_ODS_Title2");
        var x4 = document.getElementById("container__textSub_ODS_Text2");
        var x5 = document.getElementById("imgSUB_ODS1_3");
        var x6 = document.getElementById("imgSUB_ODS1_2");




        x3.style.removeProperty('right');
        x3.style.left="-100px";
        x3.style.animation="slide 2s forwards";

        x4.style.removeProperty('right');
        x4.style.left="-100px";
        x4.style.animation="slide 2s forwards";

        x6.style.removeProperty('right');
        x6.style.left="-100px";
        x6.style.animation="slide 2s forwards";


        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";


    
        

      }else if(div_ativa == "#my_dataviz3")
      {
         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz3").selectAll("svg").remove();
         create_Barplot3(dataSet, false);

        var x1 = document.getElementById("container__textSub_ODS_Title4");
        var x2 = document.getElementById("container__textSub_ODS_Text4");
        var x3 = document.getElementById("container__textSub_ODS_Title3");
        var x4 = document.getElementById("container__textSub_ODS_Text3");
        var x5 = document.getElementById("imgSUB_ODS1_4");
        var x6 = document.getElementById("imgSUB_ODS1_3");



        x3.style.removeProperty('right');
        x3.style.left="-100px";
        x3.style.animation="slide 2s forwards";

        x4.style.removeProperty('right');
        x4.style.left="-100px";
        x4.style.animation="slide 2s forwards";

        x6.style.removeProperty('right');
        x6.style.left="-100px";
        x6.style.animation="slide 2s forwards";



        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";

      }
      else if(div_ativa == "#my_dataviz4")
      {
         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz4").selectAll("svg").remove();
         create_Barplot4(dataSet, false);

        var x1 = document.getElementById("container__textSub_ODS_Title5");
        var x2 = document.getElementById("container__textSub_ODS_Text5");
        var x3 = document.getElementById("container__textSub_ODS_Title4");
        var x4 = document.getElementById("container__textSub_ODS_Text4");
        var x5 = document.getElementById("imgSUB_ODS1_5");
        var x6 = document.getElementById("imgSUB_ODS1_4");


        x3.style.removeProperty('right');
        x3.style.left="-100px";
        x3.style.animation="slide 2s forwards";

        x4.style.removeProperty('right');
        x4.style.left="-100px";
        x4.style.animation="slide 2s forwards";

        x6.style.removeProperty('right');
        x6.style.left="-100px";
        x6.style.animation="slide 2s forwards";


        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";

      }
      else if(div_ativa == "#my_dataviz5")
      {
         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz5").selectAll("svg").remove();
         create_Barplot5(dataSet, false);


        
        var x1 = document.getElementById("container__textSub_ODS_Title6");
        var x2 = document.getElementById("container__textSub_ODS_Text6");
        var x3 = document.getElementById("container__textSub_ODS_Title5");
        var x4 = document.getElementById("container__textSub_ODS_Text5");
        var x5 = document.getElementById("imgSUB_ODS1_6");
        var x6 = document.getElementById("imgSUB_ODS1_5");


        x3.style.removeProperty('right');
        x3.style.left="-100px";
        x3.style.animation="slide 2s forwards";

        x4.style.removeProperty('right');
        x4.style.left="-100px";
        x4.style.animation="slide 2s forwards";

        x6.style.removeProperty('right');
        x6.style.left="-100px";
        x6.style.animation="slide 2s forwards";


        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";

      }
      else if(div_ativa == "#my_dataviz6")
      {
         /* Dar reset ao Select Menu Pq quando mudo de gráfico ele volta sempre para o 2019*/
         $('#my_select option:first').prop('selected',true);

         d3.select("#my_dataviz6").selectAll("svg").remove();
         create_Barplot6(dataSet, false);

        
        var x1 = document.getElementById("container__textSub_ODS_Title1");
        var x2 = document.getElementById("container__textSub_ODS_Text1");
        var x3 = document.getElementById("container__textSub_ODS_Title6");
        var x4 = document.getElementById("container__textSub_ODS_Text6");
        var x5 = document.getElementById("imgSUB_ODS1_1");
        var x6 = document.getElementById("imgSUB_ODS1_6");


        x3.style.removeProperty('right');
        x3.style.left="-100px";
        x3.style.animation="slide 2s forwards";

        x4.style.removeProperty('right');
        x4.style.left="-100px";
        x4.style.animation="slide 2s forwards";

        x6.style.removeProperty('right');
        x6.style.left="-100px";
        x6.style.animation="slide 2s forwards";



        x1.style.display="none";
        x2.style.display="none";
        x3.style.display="block";
        x4.style.display="block";
        x5.style.display="none";
        x6.style.display="inline";

      }

      // exit the loop
      break;
    }
  }
}


document.querySelector('div.cycle-hide').classList.add('active');
document.getElementById('Arrow_Right').addEventListener('click', cycleVisibility, false);
document.getElementById('Arrow_Left').addEventListener('click', cycleVisibilityBack, false);







}







function create_Barplot1(data, update){
  
  // set the dimensions and margins of the graph
   const margin = {top: 10, right: 30, bottom: 20, left: 60},
   width = 900 - margin.left - margin.right,
   height = 480 - margin.top - margin.bottom;





data = data.filter(function (d) {
  if (d.Title == 'População em risco de pobreza ou exclusão social (%)') {
      return d;
  }
});

data_aux = dataSet
data_aux = data_aux.filter(function (d) {
  if (d.Title == 'População em risco de pobreza ou exclusão social (%)') {
      return d;
  }
});
const max = d3.max(data_aux.map(d => d.Value).map(Number));
const min = d3.min(data_aux.map(d => d.Value).map(Number));



if(!update)
{
  data = data.filter(function (d) {
  if (d.Ano == 2019) {
      return d;
  }
});
}

  // sort data
data.sort(function(b, a) {
  return b.Value - a.Value;
});





 // X axis
const x = d3.scaleBand()
.range([margin.left, width ])
.domain(data.map(d => d.Abreviatura))
.padding(0.2);


function xAxis(g) {
g.attr("transform", `translate(0,${height - 40})`)
.call(
  d3.axisBottom(x)
  .tickSize(0))
.selectAll("text")
  .attr("transform", "translate(0, 5)rotate(0)")
  .style("text-anchor", "center");
}

 
 // Add Y axis
 const y = d3.scaleLinear()
 .domain([0, Math.ceil(max)])
 .range([ height - 40, 30]);



   function yAxis(g) {
    g.attr("transform", `translate(${margin.left},0)`)
    g.call(
      d3.axisLeft(y)
      .ticks(6)
      .tickSize(-5))
      .attr("class", "axisGray");
  }



  function grid(g) {
  g
    .attr("stroke", "#525252")
    .attr("stroke-opacity", 0.1)
    .call((g) =>
      g
        .append("g")
        .selectAll("line")
        .data(y.ticks(6))
        .join("line")
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("x1", margin.left)
        .attr("x2", width)
    );
  }


  if (!update) {

    d3.select("div#my_dataviz1").append("svg").append("g").attr("class", "bars");
  }



 const svg = d3
 .select("div#my_dataviz1")
 .select("svg")
 .attr("width", width)
 .attr("height", height);


 
if (!update) {

const yLabelSize = BrowserText.getWidth('% da população', 14, 'sans-serif');

// Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", 20)
.attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
.text("% da população")
.style("fill", "#000033")
.style("font-size", "14px")
.attr("font-family", "sans-serif")
 


svg.append("text")
.attr("x", width/2)
.attr("y", 15)
.attr("text-anchor", "middle")
.style("font-size", "18px")
.style("font-weight", "bold")
.style("fill", "#3A3B3C")
.attr("font-family", "sans-serif")
.text("População em risco de Pobreza ou Exclusão Social");

}  


var div = d3.select("div#my_dataviz1").append("div")	
 .attr("class", "tooltip")				
 .style("opacity", 0)
 .style("background", tooltip_background);


 if (!update) {
  svg.append("g").attr("class", "xAxis");
  svg.append("g").attr("class", "yAxis");
  svg.select("g.bars").append("g").attr("class", "scatterGrid").call(grid);
}




for(var j=0;j<=1;j++)
{
  //Agora vou desenhar pela primeira vez as barras, fazendo a ligação entre a barra e o eixo dos x pelo valor de abreviatura
  //largura é dada automaticamente pelo x.bandwidth(), y inicialmente é 0 em todas elas porque tenho uma animação de carregamento
  //penso que subtrai o -40 por ter a ver com a margem, para assegurar que ia mesmo para 0.
  //Barras da UE27 e de Portugal têm cor diferente para dar mais realce, as outras são calculadas através do interpolateBuGn
  // - que é basicamente uma escala de verdes.
  svg
   .select("g.bars")
   .selectAll("rect")
   .data(data, function (d) {
     return d.Abreviatura;
   })
   .join(
     (enter) => {
       return enter
         .append("rect")
         .attr("x", d => x(d.Abreviatura))
         .attr("width", x.bandwidth())
         .attr("height", d => height - y(0) - 40)
         .attr("y", d => y(0))
         .style("fill", function calculateFill(dataItem, i) {
      
          if (dataItem.Country == "União Europeia 27") {
            return "#003399";
          }
          else if (dataItem.Country == "Portugal") {
            return "#DC143C";
          }
          else {
            var scale = d3
            .scaleLinear()
            .domain([0, d3.max(data.map(d => d.Value).map(Number))])
            .range([0, 1]);
             return d3.interpolateBuGn(scale(dataItem.Value));
          }
        })
         .on("mouseover", handleMouseOver)
         .on("mouseout", handleMouseOut)
         .transition()
         .duration(800)
         .style("opacity", 1);
     },
     (update) => {
       update
         .transition()
         .duration(1000)
         .attr("width", x.bandwidth())
         .attr("height", d => height - y(d.Value) - 40) // always equal to 0
         .style("fill", function calculateFill(dataItem, i) {
      
          if (dataItem.Country == "União Europeia 27") {
            return "#003399";
          }
          else if (dataItem.Country == "Portugal") {
            return "#DC143C";
          }
          else {
            var scale = d3
            .scaleLinear()
            .domain([0, d3.max(data.map(d => d.Value).map(Number))])
            .range([0, 1]);
             return d3.interpolateBuGn(scale(dataItem.Value));
          }
        })
         .attr("x", d => x(d.Abreviatura))
         .attr("y", d => y(d.Value))  
     },
     (exit) => {
       return exit.remove();
     }
   );


     if(!update)
     {
        // Animação de carregamento das barras
        svg.selectAll("rect")
          .transition()
          .duration(800)
          .attr("y", d => y(d.Value))
          .attr("height", d => height - y(d.Value)-40)
          .delay((d,i) => {return 0*20})
     }
}


d3.select("div#my_dataviz1").select("g.xAxis").call(xAxis);
d3.select("div#my_dataviz1").select("g.yAxis").call(yAxis);

 
 
}


function create_Barplot2(data, update){
  
  // set the dimensions and margins of the graph
   const margin = {top: 10, right: 30, bottom: 20, left: 60},
   width = 900 - margin.left - margin.right,
   height = 480 - margin.top - margin.bottom;





data = data.filter(function (d) {
  if (d.Title == 'Taxa de risco de pobreza após transferências sociais') {
      return d;
  }
});

data_aux = dataSet
data_aux = data_aux.filter(function (d) {
  if (d.Title == 'Taxa de risco de pobreza após transferências sociais') {
      return d;
  }
});
const max = d3.max(data_aux.map(d => d.Value).map(Number));
const min = d3.min(data_aux.map(d => d.Value).map(Number));



if(!update)
{
  data = data.filter(function (d) {
  if (d.Ano == 2019) {
      return d;
  }
});
}

  // sort data
data.sort(function(b, a) {
  return b.Value - a.Value;
});





 // X axis
const x = d3.scaleBand()
.range([margin.left, width ])
.domain(data.map(d => d.Abreviatura))
.padding(0.2);


function xAxis(g) {
g.attr("transform", `translate(0,${height - 40})`)
.call(
  d3.axisBottom(x)
  .tickSize(0))
.selectAll("text")
  .attr("transform", "translate(0, 5)rotate(0)")
  .style("text-anchor", "center");
}

 
 // Add Y axis
 const y = d3.scaleLinear()
 .domain([0, Math.ceil(max)])
 .range([ height - 40, 30]);



   function yAxis(g) {
    g.attr("transform", `translate(${margin.left},0)`)
    g.call(
      d3.axisLeft(y)
      .ticks(6)
      .tickSize(-5))
      .attr("class", "axisGray");
  }



  function grid(g) {
  g
    .attr("stroke", "#525252")
    .attr("stroke-opacity", 0.1)
    .call((g) =>
      g
        .append("g")
        .selectAll("line")
        .data(y.ticks(6))
        .join("line")
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("x1", margin.left)
        .attr("x2", width)
    );
  }


  if (!update) {

    d3.select("div#my_dataviz2").append("svg").append("g").attr("class", "bars");
  }



 const svg = d3
 .select("div#my_dataviz2")
 .select("svg")
 .attr("width", width)
 .attr("height", height);


 
if (!update) {

const yLabelSize = BrowserText.getWidth('% da população', 14, 'sans-serif');

// Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", 20)
.attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
.text("% da população")
.style("fill", "#000033")
.style("font-size", "14px")
.attr("font-family", "sans-serif")
 


svg.append("text")
.attr("x", width/2)
.attr("y", 15)
.attr("text-anchor", "middle")
.style("font-size", "18px")
.style("font-weight", "bold")
.style("fill", "#3A3B3C")
.attr("font-family", "sans-serif")
.text("Taxa de Risco de Pobreza Após Transferências Sociais");

}  


var div = d3.select("div#my_dataviz2").append("div")	
 .attr("class", "tooltip")				
 .style("opacity", 0)
 .style("background", tooltip_background);


 if (!update) {
  svg.append("g").attr("class", "xAxis");
  svg.append("g").attr("class", "yAxis");
  svg.select("g.bars").append("g").attr("class", "scatterGrid").call(grid);
}




for(var j=0;j<=1;j++)
{
 svg
 .select("g.bars")
 .selectAll("rect")
 .data(data, function (d) {
   return d.Abreviatura;
 })
 .join(
   (enter) => {
     return enter
       .append("rect")
       .attr("x", d => x(d.Abreviatura))
       .attr("width", x.bandwidth())
       //.attr("height", d => height - y(d.Value) - 40)
       .attr("height", d => height - y(0) - 40)
       //.attr("y", d => y(d.Value))
       .attr("y", d => y(0))
       .style("fill", function calculateFill(dataItem, i) {
    
        if (dataItem.Country == "União Europeia 27") {
          return "#003399";
        }
        else if (dataItem.Country == "Portugal") {
          return "#DC143C";
        }
        else {
          var scale = d3
          .scaleLinear()
          .domain([0, d3.max(data.map(d => d.Value).map(Number))])
          .range([0, 1]);
           return d3.interpolateBuGn(scale(dataItem.Value));
        }
      })
       .on("mouseover", handleMouseOver)
       .on("mouseout", handleMouseOut)
       .transition()
       .duration(800)
       .style("opacity", 1);
   },
   (update) => {
     update
       .transition()
       .duration(1000)
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d.Value) - 40) // always equal to 0
       .style("fill", function calculateFill(dataItem, i) {
    
        if (dataItem.Country == "União Europeia 27") {
          return "#003399";
        }
        else if (dataItem.Country == "Portugal") {
          return "#DC143C";
        }
        else {
          var scale = d3
          .scaleLinear()
          .domain([0, d3.max(data.map(d => d.Value).map(Number))])
          .range([0, 1]);
           return d3.interpolateBuGn(scale(dataItem.Value));
        }
      })
       .attr("x", d => x(d.Abreviatura))
       .attr("y", d => y(d.Value))  
   },
   (exit) => {
     return exit.remove();
   }
 );


   if(!update)
   {
         // Animation
      svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", d => y(d.Value))
      .attr("height", d => height - y(d.Value)-40)
      .delay((d,i) => {return 0*20})
   }
  }


d3.select("div#my_dataviz2").select("g.xAxis").call(xAxis);
d3.select("div#my_dataviz2").select("g.yAxis").call(yAxis);

 
 
}


function create_Barplot3(data, update){
  
  // set the dimensions and margins of the graph
   const margin = {top: 10, right: 30, bottom: 20, left: 60},
   width = 900 - margin.left - margin.right,
   height = 480 - margin.top - margin.bottom;





data = data.filter(function (d) {
  if (d.Title == 'Taxa de privação material severa') {
      return d;
  }
});

data_aux = dataSet
data_aux = data_aux.filter(function (d) {
  if (d.Title == 'Taxa de privação material severa') {
      return d;
  }
});
const max = d3.max(data_aux.map(d => d.Value).map(Number));
const min = d3.min(data_aux.map(d => d.Value).map(Number));



if(!update)
{
  data = data.filter(function (d) {
  if (d.Ano == 2019) {
      return d;
  }
});
}

  // sort data
data.sort(function(b, a) {
  return b.Value - a.Value;
});





 // X axis
const x = d3.scaleBand()
.range([margin.left, width ])
.domain(data.map(d => d.Abreviatura))
.padding(0.2);


function xAxis(g) {
g.attr("transform", `translate(0,${height - 40})`)
.call(
  d3.axisBottom(x)
  .tickSize(0))
.selectAll("text")
  .attr("transform", "translate(0, 5)rotate(0)")
  .style("text-anchor", "center");
}

 
 // Add Y axis
 const y = d3.scaleLinear()
 .domain([0, Math.ceil(max)])
 .range([ height - 40, 30]);



   function yAxis(g) {
    g.attr("transform", `translate(${margin.left},0)`)
    g.call(
      d3.axisLeft(y)
      .ticks(6)
      .tickSize(-5))
      .attr("class", "axisGray");
  }



  function grid(g) {
  g
    .attr("stroke", "#525252")
    .attr("stroke-opacity", 0.1)
    .call((g) =>
      g
        .append("g")
        .selectAll("line")
        .data(y.ticks(6))
        .join("line")
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("x1", margin.left)
        .attr("x2", width)
    );
  }


  if (!update) {

    d3.select("div#my_dataviz3").append("svg").append("g").attr("class", "bars");
  }



 const svg = d3
 .select("div#my_dataviz3")
 .select("svg")
 .attr("width", width)
 .attr("height", height);


 
if (!update) {

const yLabelSize = BrowserText.getWidth('% da população', 14, 'sans-serif');

// Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", 20)
.attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
.text("% da população")
.style("fill", "#000033")
.style("font-size", "14px")
.attr("font-family", "sans-serif")
 


svg.append("text")
.attr("x", width/2)
.attr("y", 15)
.attr("text-anchor", "middle")
.style("font-size", "18px")
.style("font-weight", "bold")
.style("fill", "#3A3B3C")
.attr("font-family", "sans-serif")
.text("Taxa de Privação Material Severa");

}  


var div = d3.select("div#my_dataviz3").append("div")	
 .attr("class", "tooltip")				
 .style("opacity", 0)
 .style("background", tooltip_background);


 if (!update) {
  svg.append("g").attr("class", "xAxis");
  svg.append("g").attr("class", "yAxis");
  svg.select("g.bars").append("g").attr("class", "scatterGrid").call(grid);
}




for(var j=0;j<=1;j++)
{
  //Agora vou desenhar pela primeira vez as barras, fazendo a ligação entre a barra e o eixo dos x pelo valor de abreviatura
  //largura é dada automaticamente pelo x.bandwidth(), y inicialmente é 0 em todas elas porque tenho uma animação de carregamento
  //penso que subtrai o -40 por ter a ver com a margem, para assegurar que ia mesmo para 0.
  //Barras da UE27 e de Portugal têm cor diferente para dar mais realce, as outras são calculadas através do interpolateBuGn
  // - que é basicamente uma escala de verdes.
  svg
   .select("g.bars")
   .selectAll("rect")
   .data(data, function (d) {
     return d.Abreviatura;
   })
   .join(
     (enter) => {
       return enter
         .append("rect")
         .attr("x", d => x(d.Abreviatura))
         .attr("width", x.bandwidth())
         .attr("height", d => height - y(0) - 40)
         .attr("y", d => y(0))
         .style("fill", function calculateFill(dataItem, i) {
      
          if (dataItem.Country == "União Europeia 27") {
            return "#003399";
          }
          else if (dataItem.Country == "Portugal") {
            return "#DC143C";
          }
          else {
            var scale = d3
            .scaleLinear()
            .domain([0, d3.max(data.map(d => d.Value).map(Number))])
            .range([0, 1]);
             return d3.interpolateBuGn(scale(dataItem.Value));
          }
        })
         .on("mouseover", handleMouseOver)
         .on("mouseout", handleMouseOut)
         .transition()
         .duration(800)
         .style("opacity", 1);
     },
     (update) => {
       update
         .transition()
         .duration(1000)
         .attr("width", x.bandwidth())
         .attr("height", d => height - y(d.Value) - 40) // always equal to 0
         .style("fill", function calculateFill(dataItem, i) {
      
          if (dataItem.Country == "União Europeia 27") {
            return "#003399";
          }
          else if (dataItem.Country == "Portugal") {
            return "#DC143C";
          }
          else {
            var scale = d3
            .scaleLinear()
            .domain([0, d3.max(data.map(d => d.Value).map(Number))])
            .range([0, 1]);
             return d3.interpolateBuGn(scale(dataItem.Value));
          }
        })
         .attr("x", d => x(d.Abreviatura))
         .attr("y", d => y(d.Value))  
     },
     (exit) => {
       return exit.remove();
     }
   );


     if(!update)
     {
        // Animação de carregamento das barras
        svg.selectAll("rect")
          .transition()
          .duration(800)
          .attr("y", d => y(d.Value))
          .attr("height", d => height - y(d.Value)-40)
          .delay((d,i) => {return 0*20})
     }
  }


d3.select("div#my_dataviz3").select("g.xAxis").call(xAxis);
d3.select("div#my_dataviz3").select("g.yAxis").call(yAxis);

 
 
}


function create_Barplot4(data, update){
  
    // set the dimensions and margins of the graph
     const margin = {top: 10, right: 30, bottom: 20, left: 60},
     width = 950 - margin.left - margin.right,
     height = 480 - margin.top - margin.bottom;
 
 


data = data.filter(function (d) {
  if (d.Title == 'População a viver em agregados com intensidade laboral muito reduzida') {
      return d;
  }
});

data_aux = dataSet
data_aux = data_aux.filter(function (d) {
  if (d.Title == 'População a viver em agregados com intensidade laboral muito reduzida') {
      return d;
  }
});
const max = d3.max(data_aux.map(d => d.Value).map(Number));
const min = d3.min(data_aux.map(d => d.Value).map(Number));



if(!update)
{
    data = data.filter(function (d) {
    if (d.Ano == 2019) {
        return d;
    }
  });
}

    // sort data
  data.sort(function(b, a) {
    return b.Value - a.Value;
  });





   // X axis
  const x = d3.scaleBand()
  .range([margin.left, width ])
  .domain(data.map(d => d.Abreviatura))
  .padding(0.2);


  function xAxis(g) {
  g.attr("transform", `translate(0,${height - 40})`)
  .call(
    d3.axisBottom(x)
    .tickSize(0))
  .selectAll("text")
    .attr("transform", "translate(0, 5)rotate(0)")
    .style("text-anchor", "center")
    
  }
  
   
   // Add Y axis
   const y = d3.scaleLinear()
   .domain([0, Math.ceil(max)])
   .range([ height - 40, 30]);



     function yAxis(g) {
      g.attr("transform", `translate(${margin.left},0)`)
      g.call(
        d3.axisLeft(y)
        .ticks(6)
        .tickSize(-5))
        .attr("class", "axisGray");      
    }



    function grid(g) {
    g
      .attr("stroke", "#525252")
      .attr("stroke-opacity", 0.1)
      .call((g) =>
        g
          .append("g")
          .selectAll("line")
          .data(y.ticks(6))
          .join("line")
          .attr("y1", (d) => y(d))
          .attr("y2", (d) => y(d))
          .attr("x1", margin.left)
          .attr("x2", width)
      );
    }


    if (!update) {

      d3.select("div#my_dataviz4").append("svg").append("g").attr("class", "bars");
    }



   const svg = d3
   .select("div#my_dataviz4")
   .select("svg")
   .attr("width", width)
   .attr("height", height);


   
if (!update) {

const yLabelSize = BrowserText.getWidth('% da população', 14, 'sans-serif');

  // Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", 20)
.attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
.text("% da população")
.style("fill", "#000033")
.style("font-size", "14px")
.attr("font-family", "sans-serif")
   


svg.append("text")
  .attr("x", width/2)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .style("font-weight", "bold")
  .style("fill", "#3A3B3C")
  .attr("font-family", "sans-serif")
  .text("População a viver em agregados com intensidade laboral muito reduzida");

}  
 

var div = d3.select("div#my_dataviz4").append("div")	
   .attr("class", "tooltip")				
   .style("opacity", 0)
   .style("background", tooltip_background);


   if (!update) {
    svg.append("g").attr("class", "xAxis");
    svg.append("g").attr("class", "yAxis");
    svg.select("g.bars").append("g").attr("class", "scatterGrid").call(grid);
  }
  

 

  
  for(var j=0;j<=1;j++)
  {
    //Agora vou desenhar pela primeira vez as barras, fazendo a ligação entre a barra e o eixo dos x pelo valor de abreviatura
    //largura é dada automaticamente pelo x.bandwidth(), y inicialmente é 0 em todas elas porque tenho uma animação de carregamento
    //penso que subtrai o -40 por ter a ver com a margem, para assegurar que ia mesmo para 0.
    //Barras da UE27 e de Portugal têm cor diferente para dar mais realce, as outras são calculadas através do interpolateBuGn
    // - que é basicamente uma escala de verdes.
    svg
     .select("g.bars")
     .selectAll("rect")
     .data(data, function (d) {
       return d.Abreviatura;
     })
     .join(
       (enter) => {
         return enter
           .append("rect")
           .attr("x", d => x(d.Abreviatura))
           .attr("width", x.bandwidth())
           .attr("height", d => height - y(0) - 40)
           .attr("y", d => y(0))
           .style("fill", function calculateFill(dataItem, i) {
        
            if (dataItem.Country == "União Europeia 27") {
              return "#003399";
            }
            else if (dataItem.Country == "Portugal") {
              return "#DC143C";
            }
            else {
              var scale = d3
              .scaleLinear()
              .domain([0, d3.max(data.map(d => d.Value).map(Number))])
              .range([0, 1]);
               return d3.interpolateBuGn(scale(dataItem.Value));
            }
          })
           .on("mouseover", handleMouseOver)
           .on("mouseout", handleMouseOut)
           .transition()
           .duration(800)
           .style("opacity", 1);
       },
       (update) => {
         update
           .transition()
           .duration(1000)
           .attr("width", x.bandwidth())
           .attr("height", d => height - y(d.Value) - 40) // always equal to 0
           .style("fill", function calculateFill(dataItem, i) {
        
            if (dataItem.Country == "União Europeia 27") {
              return "#003399";
            }
            else if (dataItem.Country == "Portugal") {
              return "#DC143C";
            }
            else {
              var scale = d3
              .scaleLinear()
              .domain([0, d3.max(data.map(d => d.Value).map(Number))])
              .range([0, 1]);
               return d3.interpolateBuGn(scale(dataItem.Value));
            }
          })
           .attr("x", d => x(d.Abreviatura))
           .attr("y", d => y(d.Value))  
       },
       (exit) => {
         return exit.remove();
       }
     );
  
  
       if(!update)
       {
          // Animação de carregamento das barras
          svg.selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", d => y(d.Value))
            .attr("height", d => height - y(d.Value)-40)
            .delay((d,i) => {return 0*20})
       }
  }

 
 d3.select("div#my_dataviz4").select("g.xAxis").call(xAxis);
 d3.select("div#my_dataviz4").select("g.yAxis").call(yAxis);
   
}


function create_Barplot5(data, update){
  
  // set the dimensions and margins of the graph
   const margin = {top: 10, right: 30, bottom: 20, left: 60},
   width = 900 - margin.left - margin.right,
   height = 480 - margin.top - margin.bottom;





data = data.filter(function (d) {
  if (d.Title == 'Taxa de risco de pobreza da população empregada') {
      return d;
  }
});

data_aux = dataSet
data_aux = data_aux.filter(function (d) {
  if (d.Title == 'Taxa de risco de pobreza da população empregada') {
      return d;
  }
});
const max = d3.max(data_aux.map(d => d.Value).map(Number));
const min = d3.min(data_aux.map(d => d.Value).map(Number));



if(!update)
{
  data = data.filter(function (d) {
  if (d.Ano == 2019) {
      return d;
  }
});
}

  // sort data
data.sort(function(b, a) {
  return b.Value - a.Value;
});





 // X axis
const x = d3.scaleBand()
.range([margin.left, width ])
.domain(data.map(d => d.Abreviatura))
.padding(0.2);


function xAxis(g) {
g.attr("transform", `translate(0,${height - 40})`)
.call(
  d3.axisBottom(x)
  .tickSize(0))
.selectAll("text")
  .attr("transform", "translate(0, 5)rotate(0)")
  .style("text-anchor", "center");
}

 
 // Add Y axis
 const y = d3.scaleLinear()
 .domain([0, Math.ceil(max)])
 .range([ height - 40, 30]);



   function yAxis(g) {
    g.attr("transform", `translate(${margin.left},0)`)
    g.call(
      d3.axisLeft(y)
      .ticks(6)
      .tickSize(-5))
      .attr("class", "axisGray");
  }



  function grid(g) {
  g
    .attr("stroke", "#525252")
    .attr("stroke-opacity", 0.1)
    .call((g) =>
      g
        .append("g")
        .selectAll("line")
        .data(y.ticks(6))
        .join("line")
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("x1", margin.left)
        .attr("x2", width)
    );
  }


  if (!update) {

    d3.select("div#my_dataviz5").append("svg").append("g").attr("class", "bars");
  }



 const svg = d3
 .select("div#my_dataviz5")
 .select("svg")
 .attr("width", width)
 .attr("height", height);


 
if (!update) {

const yLabelSize = BrowserText.getWidth('% da população', 14, 'sans-serif');

// Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", 20)
.attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
.text("% da população")
.style("fill", "#000033")
.style("font-size", "14px")
.attr("font-family", "sans-serif")
 


svg.append("text")
.attr("x", width/2)
.attr("y", 15)
.attr("text-anchor", "middle")
.style("font-size", "18px")
.style("font-weight", "bold")
.style("fill", "#3A3B3C")
.attr("font-family", "sans-serif")
.text("Taxa de Risco de Pobreza da População Empregada");

}  


var div = d3.select("div#my_dataviz5").append("div")	
 .attr("class", "tooltip")				
 .style("opacity", 0)
 .style("background", tooltip_background);


 if (!update) {
  svg.append("g").attr("class", "xAxis");
  svg.append("g").attr("class", "yAxis");
  svg.select("g.bars").append("g").attr("class", "scatterGrid").call(grid);
}




for(var j=0;j<=1;j++)
{
 svg
 .select("g.bars")
 .selectAll("rect")
 .data(data, function (d) {
   return d.Abreviatura;
 })
 .join(
   (enter) => {
     return enter
       .append("rect")
       .attr("x", d => x(d.Abreviatura))
       .attr("width", x.bandwidth())
       //.attr("height", d => height - y(d.Value) - 40)
       .attr("height", d => height - y(0) - 40)
       //.attr("y", d => y(d.Value))
       .attr("y", d => y(0))
       .style("fill", function calculateFill(dataItem, i) {
    
        if (dataItem.Country == "União Europeia 27") {
          return "#003399";
        }
        else if (dataItem.Country == "Portugal") {
          return "#DC143C";
        }
        else {
          var scale = d3
          .scaleLinear()
          .domain([0, d3.max(data.map(d => d.Value).map(Number))])
          .range([0, 1]);
           return d3.interpolateBuGn(scale(dataItem.Value));
        }
      })
       .on("mouseover", handleMouseOver)
       .on("mouseout", handleMouseOut)
       .transition()
       .duration(800)
       .style("opacity", 1);
   },
   (update) => {
     update
       .transition()
       .duration(1000)
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d.Value) - 40) // always equal to 0
       .style("fill", function calculateFill(dataItem, i) {
    
        if (dataItem.Country == "União Europeia 27") {
          return "#003399";
        }
        else if (dataItem.Country == "Portugal") {
          return "#DC143C";
        }
        else {
          var scale = d3
          .scaleLinear()
          .domain([0, d3.max(data.map(d => d.Value).map(Number))])
          .range([0, 1]);
           return d3.interpolateBuGn(scale(dataItem.Value));
        }
      })
       .attr("x", d => x(d.Abreviatura))
       .attr("y", d => y(d.Value))  
   },
   (exit) => {
     return exit.remove();
   }
 );


   if(!update)
   {
         // Animation
      svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", d => y(d.Value))
      .attr("height", d => height - y(d.Value)-40)
      .delay((d,i) => {return 0*20})
   }
  }


d3.select("div#my_dataviz5").select("g.xAxis").call(xAxis);
d3.select("div#my_dataviz5").select("g.yAxis").call(yAxis);

 
 
}



function create_Barplot6(data, update){
  
  // set the dimensions and margins of the graph
   const margin = {top: 10, right: 30, bottom: 20, left: 60},
   width = 900 - margin.left - margin.right,
   height = 480 - margin.top - margin.bottom;




data = data.filter(function (d) {
if (d.Title == 'População que vive em alojamentos em más condições') {
    return d;
}
});

data_aux = dataSet
data_aux = data_aux.filter(function (d) {
if (d.Title == 'População que vive em alojamentos em más condições') {
    return d;
}
});
const max = d3.max(data_aux.map(d => d.Value).map(Number));
const min = d3.min(data_aux.map(d => d.Value).map(Number));



if(!update)
{
  data = data.filter(function (d) {
  if (d.Ano == 2019) {
      return d;
  }
});
}

  // sort data
data.sort(function(b, a) {
  return b.Value - a.Value;
});





 // X axis
const x = d3.scaleBand()
.range([margin.left, width ])
.domain(data.map(d => d.Abreviatura))
.padding(0.2);


function xAxis(g) {
g.attr("transform", `translate(0,${height - 40})`)
.call(
  d3.axisBottom(x)
  .tickSize(0))
.selectAll("text")
  .attr("transform", "translate(0, 5)rotate(0)")
  .style("text-anchor", "center");
}

 
 // Add Y axis
 const y = d3.scaleLinear()
 .domain([0, Math.ceil(max)])
 .range([ height - 40, 30]);



   function yAxis(g) {
    g.attr("transform", `translate(${margin.left},0)`)
    g.call(
      d3.axisLeft(y)
      .ticks(6)
      .tickSize(-5))
      .attr("class", "axisGray");
  }



  function grid(g) {
  g
    .attr("stroke", "#525252")
    .attr("stroke-opacity", 0.1)
    .call((g) =>
      g
        .append("g")
        .selectAll("line")
        .data(y.ticks(6))
        .join("line")
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("x1", margin.left)
        .attr("x2", width)
    );
  }


  if (!update) {

    d3.select("div#my_dataviz6").append("svg").append("g").attr("class", "bars");
  }



 const svg = d3
 .select("div#my_dataviz6")
 .select("svg")
 .attr("width", width)
 .attr("height", height);


 
if (!update) {

const yLabelSize = BrowserText.getWidth('% da população', 14, 'sans-serif');

// Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", 20)
.attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
.text("% da população")
.style("fill", "#000033")
.style("font-size", "14px")
.attr("font-family", "sans-serif")
 


svg.append("text")
.attr("x", width/2)
.attr("y", 15)
.attr("text-anchor", "middle")
.style("font-size", "18px")
.style("font-weight", "bold")
.style("fill", "#3A3B3C")
.attr("font-family", "sans-serif")
.text("População que vive em alojamentos em más condições");

}  


var div = d3.select("div#my_dataviz6").append("div")	
 .attr("class", "tooltip")				
 .style("opacity", 0)
 .style("background", tooltip_background);


 if (!update) {
  svg.append("g").attr("class", "xAxis");
  svg.append("g").attr("class", "yAxis");
  svg.select("g.bars").append("g").attr("class", "scatterGrid").call(grid);
}




for(var j=0;j<=1;j++)
{
  //Agora vou desenhar pela primeira vez as barras, fazendo a ligação entre a barra e o eixo dos x pelo valor de abreviatura
  //largura é dada automaticamente pelo x.bandwidth(), y inicialmente é 0 em todas elas porque tenho uma animação de carregamento
  //penso que subtrai o -40 por ter a ver com a margem, para assegurar que ia mesmo para 0.
  //Barras da UE27 e de Portugal têm cor diferente para dar mais realce, as outras são calculadas através do interpolateBuGn
  // - que é basicamente uma escala de verdes.
  svg
   .select("g.bars")
   .selectAll("rect")
   .data(data, function (d) {
     return d.Abreviatura;
   })
   .join(
     (enter) => {
       return enter
         .append("rect")
         .attr("x", d => x(d.Abreviatura))
         .attr("width", x.bandwidth())
         .attr("height", d => height - y(0) - 40)
         .attr("y", d => y(0))
         .style("fill", function calculateFill(dataItem, i) {
      
          if (dataItem.Country == "União Europeia 27") {
            return "#003399";
          }
          else if (dataItem.Country == "Portugal") {
            return "#DC143C";
          }
          else {
            var scale = d3
            .scaleLinear()
            .domain([0, d3.max(data.map(d => d.Value).map(Number))])
            .range([0, 1]);
             return d3.interpolateBuGn(scale(dataItem.Value));
          }
        })
         .on("mouseover", handleMouseOver)
         .on("mouseout", handleMouseOut)
         .transition()
         .duration(800)
         .style("opacity", 1);
     },
     (update) => {
       update
         .transition()
         .duration(1000)
         .attr("width", x.bandwidth())
         .attr("height", d => height - y(d.Value) - 40) // always equal to 0
         .style("fill", function calculateFill(dataItem, i) {
      
          if (dataItem.Country == "União Europeia 27") {
            return "#003399";
          }
          else if (dataItem.Country == "Portugal") {
            return "#DC143C";
          }
          else {
            var scale = d3
            .scaleLinear()
            .domain([0, d3.max(data.map(d => d.Value).map(Number))])
            .range([0, 1]);
             return d3.interpolateBuGn(scale(dataItem.Value));
          }
        })
         .attr("x", d => x(d.Abreviatura))
         .attr("y", d => y(d.Value))  
     },
     (exit) => {
       return exit.remove();
     }
   );


     if(!update)
     {
        // Animação de carregamento das barras
        svg.selectAll("rect")
          .transition()
          .duration(800)
          .attr("y", d => y(d.Value))
          .attr("height", d => height - y(d.Value)-40)
          .delay((d,i) => {return 0*20})
     }
}


   d3.select("div#my_dataviz6").select("g.xAxis").call(xAxis);
   d3.select("div#my_dataviz6").select("g.yAxis").call(yAxis);

 
 
}








function handleMouseOver(event, d) {
              
  barChart = d3.select("div#my_dataviz1").select("svg");
  barChart
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","0.3");




  barChart1 = d3.select("div#my_dataviz2").select("svg");
  barChart1
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","0.3");


  barChart2 = d3.select("div#my_dataviz3").select("svg");
  barChart2
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","0.3");


  barChart3 = d3.select("div#my_dataviz4").select("svg");
  barChart3
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","0.3");


  barChart4 = d3.select("div#my_dataviz5").select("svg");
  barChart4
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","0.3");

  barChart5 = d3.select("div#my_dataviz6").select("svg");
  barChart5
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","0.3");


  var div = d3.select("div#my_dataviz4").select("div")
  let pos = d3.select(this).node().getBoundingClientRect();

  div.transition()		
    .duration(200)		
    .style("opacity", .9);

  div.html("<strong>" + d.Country + "</strong> " + "<strong>" + "<br>" + "% da população" + ": " +"</strong> "  +  d.Value )      
    .style('left', `${pos['x']}px`)
    .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)


  var div = d3.select("div#my_dataviz1").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", .9);

  div.html("<strong>" + d.Country + "</strong> " + "<strong>" + "<br>" + "% da população" + ": " +"</strong> "  +  d.Value )      
    .style('left', `${pos['x']}px`)
    .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)

  var div = d3.select("div#my_dataviz6").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", .9);

  div.html("<strong>" + d.Country + "</strong> " + "<strong>" + "<br>" + "% da população" + ": " +"</strong> "  +  d.Value )      
    .style('left', `${pos['x']}px`)
    .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)

  var div = d3.select("div#my_dataviz3").select("div")

  div.transition()		
      .duration(200)		
      .style("opacity", .9);
  
  div.html("<strong>" + d.Country + "</strong> " + "<strong>" + "<br>" + "% da população" + ": " +"</strong> "  +  d.Value )      
      .style('left', `${pos['x']}px`)
      .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)

  var div = d3.select("div#my_dataviz2").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", .9);

  div.html("<strong>" + d.Country + "</strong> " + "<strong>" + "<br>" + "% da população" + ": " +"</strong> "  +  d.Value )      
    .style('left', `${pos['x']}px`)
    .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)


  var div = d3.select("div#my_dataviz5").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", .9);

  div.html("<strong>" + d.Country + "</strong> " + "<strong>" + "<br>" + "% da população" + ": " +"</strong> "  +  d.Value )      
    .style('left', `${pos['x']}px`)
    .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)
}




function handleMouseOut(event, d) {
       
  barChart = d3.select("div#my_dataviz1").select("svg");
  barChart
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","1")
  



 
  barChart1 = d3.select("div#my_dataviz2").select("svg");
  barChart1
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","1");



  barChart2 = d3.select("div#my_dataviz3").select("svg");
  barChart2
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","1");

  barChart3 = d3.select("div#my_dataviz4").select("svg");
  barChart3
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","1");


  barChart4 = d3.select("div#my_dataviz5").select("svg");
  barChart4
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","1");

  barChart5 = d3.select("div#my_dataviz6").select("svg");
  barChart5
    .selectAll("rect")
    .filter(function (b) {
      if (d.Country == b.Country) {
        return b;
      }
    })
  .attr("fill-opacity","1");


  var div = d3.select("div#my_dataviz1").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", 0);  

  var div = d3.select("div#my_dataviz2").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", 0);  


  var div = d3.select("div#my_dataviz3").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", 0);  


  var div = d3.select("div#my_dataviz4").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", 0);
    
  var div = d3.select("div#my_dataviz5").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", 0);  


  var div = d3.select("div#my_dataviz6").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", 0);  


    
}





var BrowserText = (function () {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d');

  /**
   * Measures the rendered width of arbitrary text given the font size and font face
   * @param {string} text The text to measure
   * @param {number} fontSize The font size in pixels
   * @param {string} fontFace The font face ("Arial", "Helvetica", etc.)
   * @returns {number} The width of the text
   **/
  function getWidth(text, fontSize, fontFace) {
      context.font = fontSize + 'px ' + fontFace;
      return context.measureText(text).width;
  }

  return {
      getWidth: getWidth
  };
})();






function calculateFill(dataItem, i) {
  var scale = d3
    .scaleLinear()
    .domain([1, d3.max(dataSet, (d) => d.Value)])
    .range([0, 1]);
  return d3.interpolateBlues(scale(dataItem.Value));
  // return "steelblue";
}



function dataChange(value, which) {
  var data_file = "/data/data_final.csv"; 
  d3.csv(data_file).then((data) =>{
      newData = data;
      newData = data.filter(function (d) {
      if (d.ODS == "1" && d.Símbolo != "Valor não disponível"){
        return d;
      }
    });
      switch (value) {
        case "2020":
          newData = data.filter(function (d) {
            if (d.Ano == 2020 && d.Símbolo != "Valor não disponível") {
              return d;
            }
          });
          break;
        case "2019":
          newData = data.filter(function (d) {
            if (d.Ano == 2019 && d.Símbolo != "Valor não disponível") {
              return d;
            }
          });
          break;
        case "2018":
          newData = data.filter(function (d) {
            if (d.Ano== 2018 && d.Símbolo != "Valor não disponível") {
              return d;
            }
          });
          break;
        case "2017":
          newData = data.filter(function (d) {
            if (d.Ano== 2017 && d.Símbolo != "Valor não disponível") {
              return d;
            }
          });
          break;
        case "2016":
          newData = data.filter(function (d) {
            if (d.Ano== 2016 && d.Símbolo != "Valor não disponível") {
              return d;
            }
          });
          break;
        case "2015":
          newData = data.filter(function (d) {
            if (d.Ano== 2015 && d.Símbolo != "Valor não disponível") {
              return d;
            }
          });
          break;
        case "2014":
          newData = data.filter(function (d) {
            if (d.Ano== 2014 && d.Símbolo != "Valor não disponível") {
              return d;
            }
          });
          break;
        case "2013":
          newData = data.filter(function (d) {
            if (d.Ano== 2013 && d.Símbolo != "Valor não disponível") {
              return d;
            }
          });
          break;
          case "2012":
            newData = data.filter(function (d) {
              if (d.Ano== 2012 && d.Símbolo != "Valor não disponível") {
                return d;
              }
            });
            break;
            case "2011":
              newData = data.filter(function (d) {
                if (d.Ano== 2011 && d.Símbolo != "Valor não disponível") {
                  return d;
                }
              });
              break;
            case "2010":
          newData = data.filter(function (d) {
            if (d.Ano== 2010 && d.Símbolo != "Valor não disponível") {
              return d;
            }
          });
          break;
        default:
          break;
      }



        create_Barplot1(newData, true);
        create_Barplot2(newData, true);
      

        create_Barplot3(newData, true);
        create_Barplot4(newData, true);

        create_Barplot5(newData, true);
        create_Barplot6(newData, true);
      
        
     })
     .catch((error) => {
      console.log(error);
    });
}



