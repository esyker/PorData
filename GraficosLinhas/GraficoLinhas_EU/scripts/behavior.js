/*Initial country and ODS*/
var country = "Alemanha";
var ods = 1;
var showEUData = true;
var font = "Fontes: Eurostat | Institutos Nacionais de Estatística, PORDATA Última actualização: 2021-12-06";
var ods_descriptions_dict = {
  1: "Erradicar a pobreza em todas as suas formas, em todos os lugares",
  2: "Erradicar a fome, alcançar a segurança alimentar, melhorar a nutrição e promover a agricultura sustentável",
  3: "Garantir o acesso à saúde de qualidade e promover o bem-estar para todos, em todas as idades",
  4: "Garantir o acesso à educação inclusiva, de qualidade e equitativa, e promover oportunidades de aprendizagem ao longo da vida para todos",
  5: "Alcançar a igualdade de género e empoderar todas as mulheres e raparigas",
  6: "Garantir a disponibilidade e a gestão sustentável da água potável e do saneamento para todos",
  7: "Garantir o acesso a fontes de energia fiáveis, sustentáveis e modernas para todos",
  8: "Promover o crescimento económico inclusivo e sustentável, o emprego pleno e produtivo e o trabalho digno para todos",
  9: "Construir infraestruturas resilientes, promover a industrialização inclusiva e sustentável e fomentar a inovação",
  10: "Reduzir as desigualdades no interior de países e entre países",
  11: "Tornar as cidades e as comunidades mais inclusivas, seguras, resilientes e sustentáveis",
  12: "Garantir padrões de consumo e de produção sustentáveis",
  13: "Adotar medidas urgentes para combater as alterações climáticas e os seus impactos",
  14: "Conservar e usar de forma sustentável os oceanos, mares e os recursos marinhos para o desenvolvimento sustentável",
  15: "Proteger, restaurar e promover o uso sustentável dos ecossistemas terrestres, gerir de forma sustentável as florestas, combater a desertificação, travar e reverter a degradação dos solos e travar a perda de biodiversidade",
  16: "Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável, proporcionar o acesso à justiça para todos e construir instituições eficazes, responsáveis e inclusivas a todos os níveis",
  17: "Reforçar os meios de implementação e revitalizar a parceria global para o desenvolvimento sustentável"
}

function odsDropDownToogle() {
  document.getElementById("myDropdownODS").classList.toggle("show");
}

function showOrHideEUAverage(){
  let euAverageBtn = document.getElementById('showOrHideEuAverage');
  if(showEUData){//Hide the circles, line and label from the EU data
    d3.selectAll("path#eu_average").style("display","none");
    d3.selectAll(".eu_line_label").style("display","none");
    d3.selectAll("circle.eu_circles").style("display","none");
    showEUData = false;
    euAverageBtn.innerHTML= "Mostrar média UE";
    euAverageBtn.style.backgroundColor = "rgb(31, 129, 44)";
  }
  else{//Show the circles, line and label from the EU data
    d3.selectAll("path#eu_average").style("display",null);
    d3.selectAll(".eu_line_label").style("display",null);
    d3.selectAll("circle.eu_circles").style("display",null);
    showEUData = true;
    euAverageBtn.innerHTML= "Esconder média UE";
    euAverageBtn.style.backgroundColor = "rgb(214, 64, 18)";
  }
}

function range(_start_, _end_) {
  return (new Array(_end_ - _start_ + 1)).fill(undefined).map((_, k) =>k + _start_);
}

/*Change the value of the country global variable: called when the Country selected is Clicked*/
function dataCountryChange(value) {
  country = value;
  if(country!=null && ods!=null)
    dataChange();
}

/*Change the value of the ODS global variable: called when the button of ODS selector is clicked*/
function dataODSChange(value) {
  ods = value;
  odsDropDownToogle();
  document.getElementById("dropdownTextODS").innerHTML="Selecionar ODS > ODS"+value;
  if(country!=null && ods!=null)
    dataChange();
}

/*Changes the data according to the change in ODS or Country*/
function dataChange() {
  if(ods==null || country == null)
    return;
  d3.csv("data/Dados_ODS_Pordata_V3.csv")
    .then((data) => {
      newData = data;
      newData = data.filter(function (d) {
        if (d.Território == country &&  d.ODS==ods) {
          return d;
        }
      });
      euData = data.filter(function (d) {
        if (d.Território == "União Europeia 27 (desde 2020)" &&  d.ODS==ods) {
          return d;
        }
      });
      createLineCharts(newData, euData,country, ods, true);
    })
    .catch((error) => {
      console.log(error);
    });
}

/*Initialize the data and set the selector of country functions*/
function init() {
  /*Set the toogle of the selector of the Countries*/
  (function($){
	
    /* -------------------------------------------------------- */ 
    /*	//set Global variables
    /* -------------------------------------------------------- */ 
    var cards = $(".card-drop"),
      toggler = cards.find(".toggle"),
      links = cards.find("ul>li>a"),
      li = links.parent('li'),
      count = links.length,
      width = links.outerWidth();
  
      //set z-Index of drop Items
      links.parent("li").each(function(i){
        $(this).css("z-index" , count - i); //invert the index values
      });
  
      //set top margins & widths of li elements
      function setClosed(){
        li.each(function(index){
           $(this).css("top" , index *0)
               .css("width" , width - index *0)
               .css("margin-left" , (index*0)/2);
        });
        li.addClass('closed');
        toggler.removeClass("active");
      }
      setClosed();
  
    /* -------------------------------------------------------- */ 
    /*	Toggler Click handler
    /* -------------------------------------------------------- */ 
    toggler.on("mousedown" , function(){
      var $this = $(this); //cache $(this)
      //if the menu is active:
      if($this.is(".active")){
        setClosed();
      }else{
        //if the menu is un-active:
        $this.addClass("active");
        li.removeClass('closed');
        //set top margins
        li.each(function(index){
           $(this).css("top" , 60 * (index + 1))
               .css("width" , "100%")
               .css("margin-left" , "0px");
        });
      }
    });
  
    /* -------------------------------------------------------- */ 
    /*	Links Click handler
    /* -------------------------------------------------------- */ 
    links.on("click" , function(e){
      var $this = $(this),
        label = $this.data("label");
        icon = $this.children("i").attr("class");

        li.removeClass('active');
      if($this.parent("li").is("active")){
        $this.parent('li').removeClass("active");
      }else{
        $this.parent("li").addClass("active");
      }

      toggler.children("span").text(label);
      toggler.children("i").removeClass().addClass(icon);

      dataCountryChange(label);
      setClosed();
      e.preventDefault;
    });
  
  })(jQuery);

  //create the intial chart
  dataChange();
}

/*Calls createLineChart for each Indicator*/
function createLineCharts(data, euData, Território, ODS, update){
  if(Território==null || ODS ==null)
    return;
  //remove previous lines of other country or other ODS
  d3.select("#lineCharts").selectAll("*").remove();

  indicadores = {};
  data.map((d)=>{ if(d.Território == Território && d.Símbolo!="Valor não disponível"
                            && d.ODS==ODS) indicadores[d.Título]=d.ODS});

  var descriptiondiv = document.getElementById("description_text");
  descriptiondiv.innerHTML="Descrição: "+ods_descriptions_dict[ODS];  

  let count =0;
  for(const titulo in indicadores){
    createLineChart(data, euData, update, titulo , Território, indicadores[titulo], count);
    count++;
  }

}

/*Creates a single Linechart*/
function createLineChart(data, euData, update, Título, Território, ODS, id) {
  
  let data_local = data.filter(function (d) {
  if (d.Território == Território && d.ODS == ODS && d.Título == Título && 
        d.Símbolo != "Valor não disponível") {
    return d;
  }});

  let max_x = d3.max(data_local, (d) => d.Ano);
  let min_x =d3.min(data_local,(d)=>d.Ano);
  var years = range(parseInt(min_x),parseInt(max_x));

  if(euData!=null)
  {
    euData = euData.filter(function (d) {
      if ( d.Título == Título &&  d.Símbolo != "Valor não disponível" && d.Ano<=max_x 
      && d.Ano>=min_x) {
        return d;
      }});
  
    if(!euData.length)//array is empty
      euData=null;
  }
  
  var data_local_dict = data_local.reduce(function(map, obj) {
    map[obj.Ano] = obj.Indicador;
    return map;
  }, {});

  var data_local_interpolated = []
  for(let year of years){
    if(data_local_dict[year]!=undefined){
      data_local_interpolated.push({"Ano":year,"Indicador":data_local_dict[year]});
    }  
    else{
      data_local_interpolated.push({"Ano":year,"Indicador":null});
    }
  }
  
  var div = document.createElement("div");
  div.id= "lineChart"+id;
  div.className="lineChart";
  var titlediv = document.createElement("div");
  titlediv.className="lineChartTitle"; 
  titlediv.innerHTML=Título;  
  div.appendChild(titlediv);
  document.getElementById('lineCharts').appendChild(div);
  selector = "div#"+div.id;

  margin = { top: 10, right: 100, bottom: 50, left: 60 };

  let width = 550 ;
  let height = 350;

  line = d3
    .line()
    .x((d) => x(dateParse(d.Ano)))
    .y((d) => y(d["Indicador"]))
    .defined(function (d) {
      return d.Indicador != null;
    });
    
  
  var dateParse = d3.timeParse("%Y");
  var xTicks =years.map((d)=>dateParse(d));
  
  let x = d3
    .scaleTime()
    .domain(d3.extent(xTicks))
    .range([margin.left, width - margin.right]);
    //.nice();
  let min, max, eu_min, eu_max, data_min, data_max;

  if(euData!=null)
  {
    data_min = d3.min(data_local, (d) => parseFloat(d["Indicador"]));
    data_max = d3.max(data_local, (d) => parseFloat(d["Indicador"]));
    eu_min = d3.min(euData, (d) => parseFloat(d["Indicador"]));
    eu_max = d3.max(euData, (d) => parseFloat(d["Indicador"]));
    max =  Math.max(data_max,eu_max);
    min = Math.min(data_min,eu_min);
  }
  else{
    data_min = d3.min(data_local, (d) => parseFloat(d["Indicador"]));
    data_max = d3.max(data_local, (d) => parseFloat(d["Indicador"]));
    min = data_min;
    max = data_max;
  }

  let A = max-min;//amplitude

  let y = d3
    .scaleLinear()
    .domain([Math.min(Math.round(min-A/5),min-0.1),Math.max(Math.round(max+A/5),max+0.1)])
    .range([height - margin.bottom, margin.top]);

  var formatTime = d3.timeFormat("%Y");
  
  xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((x)=> formatTime(x))
        .tickValues(xTicks)
    );

  yAxis = (g) =>
    g.attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat((x) => x));
  
  d3.select(selector)
    .append("svg");
  

let svg = d3
    .select(selector)
    .select("svg")
    .attr("width", width)
    .attr("height", height);

  svg.append("rect")
    .attr("width", width-margin.left-margin.right+0.07*margin.right)
    .attr("height", height-margin.bottom-margin.top)
    .attr("class","background")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g").attr("class", "line");
  
  /*Add the paths for the line charts*/
  svg.append("path").attr("id","normal");
  svg.append("path").attr("id","dashed");
  if(euData!=null)
    svg.append("path").attr("id","eu_average");

  svg.append("g").attr("class", "lineXAxis");
  svg.append("g").attr("class", "lineYAxis");

  svg.select("g.lineXAxis").call(xAxis);

  svg.select("g.lineYAxis").call(yAxis);

//Add X axis label with d3
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - margin.right + margin.left*0.6)
    .attr("y", height-margin.bottom+15)
    .style("font-size", "11px")
    .text("Ano");

//Add Y axis label with d3
var yAxisUnit = (Título.includes("Rendimento") || Título.includes("Taxa") || Título.includes("%")) ? "%" : "";
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", margin.left*0.4)
    .attr("dy", ".75em")
    .text(yAxisUnit);

var euDatavisibility = showEUData == true ? null : "none";

//Add line Chart label only if there are two lines (the eu_average line also exists)
if(euData!=null)
{ 
  let last_value_eu = euData.at(-1).Indicador;
  let last_value_data = data_local.at(-1).Indicador; 
  let offset = Math.abs(last_value_eu - last_value_data) < max * 0.04 ? 20 : 0;
  if(last_value_eu<last_value_data) offset = -offset;

  svg.append("text")
    .attr("class", "eu_line_label")
    .attr("transform", "translate(" + (width-margin.left*1.5) + "," + y(last_value_eu) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "red")
    .style("font-size", "11px")
    .style("display", euDatavisibility)
		.text("Média UE");

	svg.append("text")
    .attr("class", "data_line_label")
    .attr("transform", "translate(" + (width-margin.left*1.5) + "," + (y(last_value_data)+offset) + ")")
		.attr("text-anchor", "start")
		.style("fill", "steelblue")
    .style("font-size", "11px")
    .style("display", null)
		.text(Território);
}
  
  svg
    .select("path#normal")
    .datum(data_local_interpolated)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 3)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-dasharray", 0)
    .transition()
    .duration(1000)
    .attr("d", line);
  
    svg
    .select("path#dashed")
    .datum(data_local)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-dasharray", 5)
    .transition()
    .duration(1000)
    .attr("d", line);
    
    if(euData!=null)
    {
      svg
      .select("path#eu_average")
      .datum(euData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-dasharray", 0)
      .style("display", euDatavisibility)
      .transition()
      .duration(1000)
      .attr("d", line);
    }
    
  //Add the tooltip                    
  let focus = svg.append("g")
  .attr("class", "focus")
  .style("display", "none");

  focus.append("circle")
      .attr("r", 6);

  focus.append("rect")
      .attr("class", "tooltip")
      .attr("width", 70)
      .attr("height", 50)
      .attr("x", 8)
      .attr("y", 9)
      .attr("rx", 6)
      .attr("ry", 6);

  focus.append("text")
      .attr("class", "tooltip-date")
      .attr("x", 9)
      .attr("y", 23);

  focus.append("text")
      .attr("class", "tooltip-measure")
      .attr("x", 9)
      .attr("y", 35);

  focus.append("text")
      .attr("class", "tooltip-country")
      .attr("x", 9)
      .attr("y", 48);

  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", (event)=>{handleMouseMove(event,data_local,focus,x,y,max_x)});
  
      //Add the circles to the data points of the Country graph
      svg
      .select("g.line")
      .selectAll("circle")
      .data(data_local, function (d) {
          return d["Indicador"];
      })
      .join(
        (enter) => {
          return enter
            .append("circle")
            .attr("cx", (d) => x(dateParse(d.Ano)))
            .attr("cy", (d) => y(d["Indicador"]))
            .attr("r", 6)
            .style("fill", "steelblue")
            .style("opacity", "100%");
        });
      
      //Add circles to the data points of the EU average
      svg
      .select("g.line").append("g")
      .selectAll("circle")
      .data(euData, function (d) {
          return d["Indicador"];
      })
      .join(
        (enter) => {
          return enter
            .append("circle")
            .attr("class", "eu_circles")
            .attr("cx", (d) => x(dateParse(d.Ano)))
            .attr("cy", (d) => y(d["Indicador"]))
            .attr("r", 3)
            .style("fill", "red")
            .style("display", euDatavisibility)
            .style("opacity", "100%");
        });

    var fontdiv = document.createElement("div");
    fontdiv.className="lineChartFont"; 
    fontdiv.innerHTML=font;  
    div.appendChild(fontdiv);
    

}

/*Adds the tooltip to the nearest point in the chart*/
function handleMouseMove(event,data_local,focus,x,y,max_x) {
  var bisectDate = d3.bisector(function(d) { return d.Ano; }).left;
  var dateParse = d3.timeParse("%Y");
  var x0 = x.invert(d3.pointer(event)[0]);
  if(x0.getFullYear()>max_x)
    return;
  var i = bisectDate(data_local, x0.getFullYear(), 1);
  if(data_local.length==1)
  {
    var d = data_local[0];
  }
  else
  {
    var d0 = data_local[i - 1],
      d1 = data_local[i];
  var d = x0.getFullYear() - d0.Ano > d1.Ano - x0.getFullYear() ? d1 : d0;
  }
  
  focus.attr("transform", "translate(" + x(dateParse(d.Ano)) + "," + y(d.Indicador) + ")");
  focus.select(".tooltip-date").text(d.Ano);
  focus.select(".tooltip-measure").text(d.Indicador);
  let Território = d.Território;
  if(Território=="República Checa")//Use this so the Território does not get out of the tooltip space
  {
    Território = "Chéquia";
  }
  focus.select(".tooltip-country").text(Território);
}



