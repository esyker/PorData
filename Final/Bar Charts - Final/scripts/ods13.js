



// Estas 2 funções são responsáveis pelo funcionamento do dropdown no topo da página que permite mudar de ODS
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


//Função que vai apagar todas as entradas do select menu. De seguida
//vem uma outra função para popular o select (isto acontece porque n é possível dar hide e unhide de componentes)
//só consigo meter disabled, mas para em cada gráfico ter apenas os certos, se calhar é melhor assim
function cleanSelect(selElem) {
  var aux = document.getElementById(selElem)
  while(aux.length>0)
  {
    aux.remove(0);
  }
  return;
}

//Função para dar populate do menu Select. Recebe o vetor years, que tem os anos que vão ser representados
function populateSelect(selElem, years) {
  for(var i = 0; i<years.length ; i++)
  {
    $('#' + selElem).append($('<option>', { value : years[i] }).text(years[i])); 
  }
  return;
}

//Função Para reordenar o select menu (util porque por vezes tenho de apagar e acrescentar)
function sortSelect(selElem) {
  selElem = document.getElementById(selElem)
  var tmpAry = new Array();
  for (var i=0;i<selElem.options.length;i++) {
      tmpAry[i] = new Array();
      tmpAry[i][0] = selElem.options[i].text;
      tmpAry[i][1] = selElem.options[i].value;
  }
  tmpAry.sort();
  tmpAry.reverse();
  while (selElem.options.length > 0) {
      selElem.options[0] = null;
  }
  for (var i=0;i<tmpAry.length;i++) {
      var op = new Option(tmpAry[i][0], tmpAry[i][1]);
      selElem.options[i] = op;
  }
  return;
}



//Função para mudar a cor das Setas responsáveis por escolher o gráfico a apresentar.
//Irá mudar a cor consoante a cor do ODS em questão.
function change_Arrow_Paginate_Color(color) {
  arrows=[document.getElementById('Arrow_Left'), document.getElementById('Arrow_Right')]
  var y = arrows[0].getElementsByTagName("i");
  for(var j=0; j<arrows.length; j++)
  {
    var y = arrows[j].getElementsByTagName("i");
    for (var i = 0; i < y.length; i++)
    {
      y[i].style.backgroundColor = color;
    }
  }
  return;
}


// O background da tooltip, irá mudar de cor consoante o ODS selecionado
var tooltip_background ="#3F7E44";

function init() {

  //Dar update do gráfico consoante o valor do Ano escolhido no Select Menu
  $('select').on('change', function() {
    dataChange(this.value, 1);
  });
 

  //ler ficheiro csv e filtrar para ficar apenas com os dados relativos ao ODS em questão.
  var data_file = "/data/data_final.csv"; 
  d3.csv(data_file).then((data) =>{
    dataSet = data;
    dataSet = data.filter(function (d) {
      if (d.ODS == "13" && d.Símbolo != "Valor não disponível"){
        return d;
      }
    });


    //Como iremos ver mais à frente também, sempre que um gráfico é carregado, o select menu
    //associado, tem as suas entradas removidas e são adicionadas novas consoante os anos disponíveis para
    //gráfico em questão. Neste momento ainda têm de ser escritas à mão os valores de ano para cada gráfico.
    //Para além disso o select menu é ordenado por ordem decrescente na função sortSelect.
    cleanSelect("my_select");
    var years_valid = [2018,2017,2016,2015,2014,2013,2012,2011]
    populateSelect("my_select", years_valid);
    sortSelect("my_select");
    $('#my_select').val(years_valid[0]);

    //Como é o carregar da página, forço logo o carregamento do 1º gráfico também, com update a false
    //pois é o primeiro load dele. É impossível já haverem updates.
    create_Barplot1(dataSet, false);
    
   })
   .catch((error) => {
    console.log(error);
  });



//Em seguida, daqui, até onde diz slide(0) está a parte responsável por mudar os números
//que aparecem no paginate (basicamente dizer, qnd chego ao maximo e ando para a frente volta ao início e cenas assim)

// basic paging logic to demo the buttons
var pr = document.querySelector( '.paginate.left' );
var pl = document.querySelector( '.paginate.right' );

pr.onclick = slide.bind( this, -1 );
pl.onclick = slide.bind( this, 1 );

//Total é responsável por controlar os números que vão aparecer na parte do paginate
//Total = número de gráficos que se vão mostrar nesse ODS (neste caso 6)
var index = 0, total = 4;

function slide(offset) {
  

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



//Função responsável por controlar as mudanças na página consoante o utilizador clicou na seta para a frente ou para trás
// a cycleVisibilityBack faz exatamente o mesmo mas é triggered quando o utilizador clica na seta para trás.
//No final dou update à cor das setas que estou a usar consoante a cor do ODS, como já explicado anteriormente
function cycleVisibility(ev) {
  ev.preventDefault();

  // descobrir nome de todas as divs(as que têm gráficos, neste momento estão todas escondidas exceto uma)
  const nlist = document.querySelectorAll('div.cycle-hide');

  for (let i = 0; i < nlist.length; i++) {

    // se a div está ativa, a class name active é removida
    if (nlist[i].className.includes('active')) {
      nlist[i].classList.remove('active');

      // check wheter you're at the end of nodeList 
      const nextIndex = i < nlist.length - 1 ? i + 1 : 0;

      // tornar a div seguinte visível (seguinte, pois se estou aqui é porque o utilizador clicou para andar para a frente)
      nlist[nextIndex].classList.add('active');
      div_ativa = document.querySelector('.active').id
      div_ativa = String("#" + div_ativa)
      if(div_ativa == "#my_dataviz1")
      {

        //Como explicado anteriormente, o que acontece é o delete das entradas do select menu
        //Passar o vetor com os anos válidos para este gráfico; Recriar o select menu com esses valores e ordená-lo.
        //De seguida, forçar a classe ativa ao ano mais recente para o utilizador saber à partida qual o ano do gráfico
        //que está a ver.
        cleanSelect("my_select");
        var years_valid = [2018,2017,2016,2015,2014,2013,2012,2011]
        populateSelect("my_select", years_valid);
        sortSelect("my_select");
        $('#my_select').val(years_valid[0]);


        //Esta parte serve para apagar o gráfico que lá poderia estar, e refazê-lo de novo
        //Isto para forçar que quando esta parte é carregada, o gráfico que aparece é relativo ao ano mais recente
        //para o qual existem dados.
        d3.select("#my_dataviz1").selectAll("svg").remove();
        create_Barplot1(dataSet, false);

        

        //Estas linhas são para poder fazer a transição no texto relativo ao SUB_ODS que estou a ver
        //É importante selecionar o texto anterior, e o texto que estou a carregar agora, mesma cena para os ícones.
        //Atenção que os números aqui irão variar consoante o número de gráficos que tenho.
        //Neste caso é 6, mas se para outro ODS, forem mais há que ter em atenção às vars x1 e x2. 
        var x1 = document.getElementById("container__textSub_ODS_Title4");
        var x2 = document.getElementById("container__textSub_ODS_Text4");
        var x3 = document.getElementById("container__textSub_ODS_Title1");
        var x4 = document.getElementById("container__textSub_ODS_Text1");
        var x5 = document.getElementById("imgSUB_ODS1_4");
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


        cleanSelect("my_select");
        var years_valid = [2018,2017,2016,2015,2014,2013,2012,2011]
        populateSelect("my_select", years_valid);
        sortSelect("my_select");
        $('#my_select').val(years_valid[0]);
        
        
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



      }
      else if(div_ativa == "#my_dataviz3")
      {
         
        


        cleanSelect("my_select");
        var years_valid = [2019,2018,2017,2016,2015,2014]
        populateSelect("my_select", years_valid);
        sortSelect("my_select");
        $('#my_select').val(years_valid[0]);


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


        cleanSelect("my_select");
        var years_valid = [2019,2018,2017,2016,2015,2014,2013,2012,2011,2010]
        populateSelect("my_select", years_valid);
        sortSelect("my_select");
        $('#my_select').val(years_valid[0]);
      

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


        cleanSelect("my_select");
        var years_valid = [2018,2017,2016,2015,2014,2013,2012,2011]
        populateSelect("my_select", years_valid);
        sortSelect("my_select");
        $('#my_select').val(years_valid[0]);

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



        cleanSelect("my_select");
        var years_valid = [2018,2017,2016,2015,2014,2013,2012,2011]
        populateSelect("my_select", years_valid);
        sortSelect("my_select");
        $('#my_select').val(years_valid[0]);

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
        
                

        cleanSelect("my_select");
        var years_valid = [2019,2018,2017,2016,2015,2014]
        populateSelect("my_select", years_valid);
        sortSelect("my_select");
        $('#my_select').val(years_valid[0]);


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
         


        cleanSelect("my_select");
        var years_valid = [2019,2018,2017,2016,2015,2014,2013,2012,2011,2010]
        populateSelect("my_select", years_valid);
        sortSelect("my_select");
        $('#my_select').val(years_valid[0]);


         d3.select("#my_dataviz4").selectAll("svg").remove();
         create_Barplot4(dataSet, false);

        var x1 = document.getElementById("container__textSub_ODS_Title1");
        var x2 = document.getElementById("container__textSub_ODS_Text1");
        var x3 = document.getElementById("container__textSub_ODS_Title4");
        var x4 = document.getElementById("container__textSub_ODS_Text4");
        var x5 = document.getElementById("imgSUB_ODS1_1");
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

      // exit the loop
      break;
    }
  }
}



//Aqui chamo as funções que criei previamente responsáveis pelas ações a realizar na página
//aquando o clique em uma das setas. E mudo também a cor das setas.
document.querySelector('div.cycle-hide').classList.add('active');
document.getElementById('Arrow_Right').addEventListener('click', cycleVisibility, false);
document.getElementById('Arrow_Left').addEventListener('click', cycleVisibilityBack, false);
change_Arrow_Paginate_Color("#3F7E44");
}





function create_Barplot3(data, update){
  
    // set the dimensions and margins of the graph
     const margin = {top: 10, right: 30, bottom: 20, left: 60},
     width = 950 - margin.left - margin.right,
     height = 480 - margin.top - margin.bottom;
 
 

//Filtrar os dados para este primeiro gráfico
data = data.filter(function (d) {
  if (d.Title == 'Contribuição para o compromisso de $100 mil milhões em despesas relacionadas com o clima') {
      return d;
  }
});

//Mesma cena mas para descobrir depois os valores de maximo e minimo, n m lembro ao certo o porquê de ter feito isto,
//mas creio que tinha a ver com o facto de os maximos e minimos sem isto serem os do dataset todo, e isto resolveu
data_aux = dataSet
data_aux = data_aux.filter(function (d) {
  if (d.Title == 'Contribuição para o compromisso de $100 mil milhões em despesas relacionadas com o clima') {
      return d;
  }
});
const max = d3.max(data_aux.map(d => d.Value).map(Number));
const min = d3.min(data_aux.map(d => d.Value).map(Number));


//1ª Vez que o gráfico é carregado, escolho o ano de 2019, por ser o mais recente neste SubODS1
if(!update)
{
    data = data.filter(function (d) {
    if (d.Ano == 2019) {
        return d;
    }
  });
}

//Ordenar os dados por ordem crescente, é apenas para as barras depois ficarem posicionadas de forma mais bonita
    // sort data
  data.sort(function(b, a) {
    return a.Value - b.Value;
  });




   // X axis - Definir o valor minimo e maximo e a sua correspondente posição no svg
  const x = d3.scaleBand()
  .range([margin.left, width ])
  .domain(data.map(d => d.Abreviatura))
  .padding(0.2);


  //aqui é a função que vai ser chamada para desenhar o eixo dos xx concretamente
  function xAxis(g) {
  g.attr("transform", `translate(0,${height - 40})`)
  .call(
    d3.axisBottom(x)
    .tickSize(0))
  .selectAll("text")
    .attr("transform", "translate(0, 5)rotate(0)")
    .style("text-anchor", "center")}
  
   

   // Y axis - mesma cena que fiz no eixo do xx mas agora para os Y
   const y = d3.scaleLinear()
   .domain([0, Math.ceil(max)])
   .range([ height - 40, 30]);


   formatValue = d3.format(".2s");


  function yAxis(g) {
  g.attr("transform", `translate(${margin.left},0)`)
  g.call(
    d3.axisLeft(y)
    .ticks(6)
    .tickSize(-5)
    .tickFormat(function(d) { return formatValue(d)}))
  .attr("class", "axisGray");}



  //Vou desenhar também uma leve grid nos gráficos
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


    //1ª vez que corro isto, tenho que dar append à dataviz1 do svg que tem o gráfico em si, o g eu acho que
    //é da grid e dos eixos, e as bars pq depois vou desenhar barras
    if (!update) {
      d3.select("div#my_dataviz3").append("svg").append("g").attr("class", "bars");
    }



   const svg = d3
   .select("div#my_dataviz3")
   .select("svg")
   .attr("width", width)
   .attr("height", height);


//Este aqui é tb qnd n estou a dar update, pq só os pretendo desenhar uma vez, a posição deles é constante
if (!update) {

const yLabelSize = BrowserText.getWidth('Milhões de Euros', 14, 'sans-serif');

// Y axis label - A legenda do eixo dos y
svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", 10)
  .attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
  .text("Milhões de Euros")
  .style("fill", "#000033")
  .style("font-size", "14px")
  .attr("font-family", "sans-serif")
   

//O título do gráfico
svg.append("text")
  .attr("x", width/2)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .style("font-weight", "bold")
  .style("fill", "#3A3B3C")
  .attr("font-family", "sans-serif")
  .text("Contribuição para o compromisso de $100 mil milhões em despesas relacionadas com o clima");

}  
 
//Inicializar a tooltip, aparece com opacity a 0 para n estar lá inicialmente, e background com a cor definida em cima.
var div = d3.select("div#my_dataviz3").append("div")	
   .attr("class", "tooltip")				
   .style("opacity", 0)
   .style("background", tooltip_background);


   //Se é a primeira vez que estou a fazer isto, tenho então de associar ao g o eixo x e o y e a grid que é g mas vai no bars
   //Eu acho que a grid foi nas barras para poder ficar embaixo delas e não por cima, mas isto pode ter sido
   //solução meio random.
   if (!update) {
    svg.append("g").attr("class", "xAxis");
    svg.append("g").attr("class", "yAxis");
    svg.select("g.bars").append("g").attr("class", "scatterGrid").call(grid);
  }
  

 

  for(j=0;j<=1;j++)
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

 //Sem isto aqui os gráficos n vão aparecer
 d3.select("div#my_dataviz3").select("g.xAxis").call(xAxis);
 d3.select("div#my_dataviz3").select("g.yAxis").call(yAxis);
}

function create_Barplot1(data, update){
  
  // set the dimensions and margins of the graph
   const margin = {top: 10, right: 30, bottom: 20, left: 60},
   width = 900 - margin.left - margin.right,
   height = 480 - margin.top - margin.bottom;





data = data.filter(function (d) {
  if (d.Title == 'Emissão de gases de efeito estufa') {
      return d;
  }
});

data_aux = dataSet
data_aux = data_aux.filter(function (d) {
  if (d.Title == 'Emissão de gases de efeito estufa') {
      return d;
  }
});
const max = d3.max(data_aux.map(d => d.Value).map(Number));
const min = d3.min(data_aux.map(d => d.Value).map(Number));



if(!update)
{
  data = data.filter(function (d) {
  if (d.Ano == 2018) {
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

const yLabelSize = BrowserText.getWidth('CO2eq', 14, 'sans-serif');

// Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", 20)
.attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
.text("CO2eq")
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
.text("Emissão de gases de efeito estufa");

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





for(j=0;j<=1;j++)
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
if (d.Title == 'Intensidade da emissão de gases de efeito estufa pelo consumo de energia') {
    return d;
}
});

data_aux = dataSet
data_aux = data_aux.filter(function (d) {
if (d.Title == 'Intensidade da emissão de gases de efeito estufa pelo consumo de energia') {
    return d;
}
});
const max = d3.max(data_aux.map(d => d.Value).map(Number));
const min = d3.min(data_aux.map(d => d.Value).map(Number));



if(!update)
{
  data = data.filter(function (d) {
  if (d.Ano == 2018) {
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

const yLabelSize = BrowserText.getWidth('Número Índice', 14, 'sans-serif');

// Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", 20)
.attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
.text("Número Índice")
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
.text("Intensidade da emissão de gases de efeito estufa pelo consumo de energia");

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





for(j=0;j<=1;j++)
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



   d3.select("div#my_dataviz2").select("g.xAxis").call(xAxis);
   d3.select("div#my_dataviz2").select("g.yAxis").call(yAxis);

 
 
}
function create_Barplot4(data, update){
  
  // set the dimensions and margins of the graph
   const margin = {top: 10, right: 30, bottom: 20, left: 60},
   width = 900 - margin.left - margin.right,
   height = 480 - margin.top - margin.bottom;





data = data.filter(function (d) {
  if (d.Title == 'População coberta pelos signatários do Pacto de Autarcas para o Clima e Energia (%)') {
      return d;
  }
});

data_aux = dataSet
data_aux = data_aux.filter(function (d) {
  if (d.Title == 'População coberta pelos signatários do Pacto de Autarcas para o Clima e Energia (%)') {
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
  return a.Value - b.Value;
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

    d3.select("div#my_dataviz4").append("svg").append("g").attr("class", "bars");
  }



 const svg = d3
 .select("div#my_dataviz4")
 .select("svg")
 .attr("width", width)
 .attr("height", height);


 
if (!update) {

const yLabelSize = BrowserText.getWidth('Proporção %', 14, 'sans-serif');

// Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", 20)
.attr("x", -(height - margin.top - margin.bottom - yLabelSize)/2)
.text("Proporção %")
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
.text("População coberta pelos signatários do Pacto de Autarcas para o Clima e Energia (%)");

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





for(j=0;j<=1;j++)
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




//Aqui é para tratar dos eventos que acontecem quando o utilizador coloca o rato em cima de uma das barras
function handleMouseOver(event, d) {
  
  //A barra selecionada fica com uma cor mais suave (a mesma cena em todos os gráficos)
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



  //Esta parte seguinte é toda em relação às tooltips (parece muito código, mas é porque está repetido para cada gráfico)
  var div = d3.select("div#my_dataviz3").select("div")
  let pos = d3.select(this).node().getBoundingClientRect();
  
  //pequena animação de entrada da tooltip; vem com uma opacidade ligeiramente menor que 1
  div.transition()		
    .duration(200)		
    .style("opacity", .9);

  //Configurar o conteudo da tooltip; Pais - xxxx \nValor - yyyy É basicamente isso, e o (país, valor) estão a bold
  div.html("<strong>" + d.Country + "</strong> " + "<br>" + "<strong>" + "Milhões de Euros" + ": " +"</strong> "  +  d.Value/1000 + "k" )      
    .style('left', `${pos['x']}px`)
    .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)


  var div = d3.select("div#my_dataviz1").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", .9);

  div.html("<strong>" + d.Country + "</strong> " + "<strong>" + "<br>" + "CO2eq" + ": " +"</strong> "  +  d.Value )      
    .style('left', `${pos['x']}px`)
    .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)

  var div = d3.select("div#my_dataviz2").select("div")

  div.transition()		
    .duration(200)		
    .style("opacity", .9);

  div.html("<strong>" + d.Country + "</strong> " + "<strong>" + "<br>" + "Número índice" + ": " +"</strong> "  +  d.Value )      
    .style('left', `${pos['x']}px`)
    .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)

  var div = d3.select("div#my_dataviz4").select("div")

  div.transition()		
      .duration(200)		
      .style("opacity", .9);
  
  div.html("<strong>" + d.Country + "</strong> " + "<strong>" + "<br>" + "Proporção %" + ": " +"</strong> "  +  d.Value )      
      .style('left', `${pos['x']}px`)
      .style('top', `${(window.pageYOffset  + pos['y'] - 40)}px`)
}



//Aqui é basicamente reverter os eventos do mousehover, é basicamente a barra selecionada voltar a ter a opacidade original
//Tooltip desaparece, ficando com a opacidade a 0
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
    
}




//Esta aqui é uma função que serve para calcular o número de pixels que uma frase ocupa consoante o seu tamanho
//e tipo de letra.
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





//Na pratica n chamei isto nos gráficos pq escrevi a função à mão, creio que a chamar daqui estava a dar um erro,
//anyway, isto serve para calcular a cor da barra. Nos gráficos acabei por não usar interpolateBlues, mas sim uma escala de verdes.
function calculateFill(dataItem, i) {
  var scale = d3
    .scaleLinear()
    .domain([1, d3.max(dataSet, (d) => d.Value)])
    .range([0, 1]);
  return d3.interpolateBlues(scale(dataItem.Value));
}



//Esta função é importante: É responsável pelos updates nos gráficos, é chamada quando o utilizador por exemplo
//muda o valor do ano no select menu (combobox). O which, ainda não removi, mas era necessário quando se usava o range slider.
function dataChange(value, which) {
  var data_file = "/data/data_final.csv"; 
  d3.csv(data_file).then((data) =>{
      newData = data;
      newData = data.filter(function (d) {
      if (d.ODS == "13" && d.Símbolo != "Valor não disponível"){
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

        
     })
     .catch((error) => {
      console.log(error);
    });
}


