var dataSet;


function init() {



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
        }); //Aqui em cima onde estão zeros, no passado estavam 2
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

      console.log(label);
      dataChange(label);
      setClosed();
      e.preventDefault;
    });
  
  })(jQuery);


    dataSet = data;
    createScatterPlot(data, false);
}


function createScatterPlot(data, update) {
  width = 800;

  height = 600;

  margin = { top: 20, right: 25, bottom: 50, left: 50 };


  var div = d3.select("div#scatterPlot").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

    

  x = d3
    .scaleLinear()
    .domain([-5, 5]) /* escala estava log entre 0.1 - max progresso. Eu quero -5 a 5 Linear e y vai passar de -100 a 100*/
    .nice()
    .range([margin.left, width - margin.right ]);

  y = d3
    .scaleLinear()
    .domain([-100, 100])
    .range([height - margin.bottom, margin.top -15 + 30]); // Aqui estava - 20, mas fazia 100 desaparecer, mas tb altera ligeiramente coord dos pontos

  xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((x) => x / 1)
          .ticks(10)
          .tickSize(0)
      )
      .attr("class", "axisGray")
      .attr("font-weight", 600)
      .call((g) => g.select(".domain").remove());
      
      
  yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3
        .axisLeft(y)
        .tickFormat((d) => d + "%")
        .tickSize(0)
      )
      .attr("class", "axisGray")
      .attr("font-weight", 600)
      .call((g) => g.select(".domain").remove());


  grid = (g) =>
    g
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1)
      .call((g) =>
        g
          .append("g")
          .selectAll("line")
          .data(x.ticks(0))
          .join("line")
          .attr("x1", (d) => 0.5 + x(d))
          .attr("x2", (d) => 0.5 + x(d))
          .attr("y1", margin.top)
          .attr("y2", height - margin.bottom)
      )
      .call((g) =>
        g
          .append("g")
          .selectAll("line")
          .data(y.ticks(0))
          .join("line")
          .attr("y1", (d) => 0.5 + y(d))
          .attr("y2", (d) => 0.5 + y(d))
          .attr("x1", margin.left)
          .attr("x2", width - margin.right)
      );


  if (!update) {
    data = data.filter(function (d) {
      if (d.country == "kk") {
        return d;
      }
    });
        
     d3.select("div#scatterPlot")
      .append("svg")
      .append("g")
      .attr("class", "circles")
      .style("stroke-width", 1.5);

  } 

  const svg = d3
    .select("div#scatterPlot")
    .select("svg")
    .attr("width", width)
    .attr("height", height+50)
    .attr("transform", "translate(0 50)")
   
  

 

    const xLabelSize = BrowserText.getWidth('Score do Progresso', 12, 'Trebuchet MS');


    //Desenhar Setas Vermelhas e Verdes dos Axis
    svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 6)
    .attr("refY", 5)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("markerUnits","userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .style("fill", "#A6D088");

    //line              
    svg.append("line")
    .attr("x1", ((width - margin.right - margin.left)/2) + xLabelSize + 5)
    .attr("y1", height-13)
    .attr("x2", width - margin.right - 10)
    .attr("y2", height-13)
    .attr("stroke-width", 2)
    .attr("stroke", "#A6D088")
    .attr("marker-end", "url(#triangle)");
      

    svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle1")
    .attr("refX", 6)
    .attr("refY", 5)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("markerUnits","userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .style("fill", "#D66E6B");

    //line              
    svg.append("line")
    .attr("x1", ((width - margin.right - margin.left)/2) - 5)
    .attr("y1", height-13)
    .attr("x2", margin.left + 10)
    .attr("y2", height-13)
    .attr("stroke-width", 2)
    .attr("stroke", "#D66E6B")
    .attr("marker-end", "url(#triangle1)");
  		

    var yLabel = svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", 6)
    .attr("x", -(height - margin.top - margin.left + 50)/2)
    .attr("dy", ".4em")
    .attr("transform", "rotate(-90)")
    .text("Estado em Relação à UE")
    .style('fill', '#A59091')
    .attr("font-family", "Trebuchet MS")
    .style("font-size", "12px");

    const yLabelSize = BrowserText.getWidth('Estado em Relação à UE', 12, 'Trebuchet MS');

    svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle2")
    .attr("refX", 6)
    .attr("refY", 5)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("markerUnits","userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .style("fill", "#D66E6B");

    //line              
    svg.append("line")
    .attr("x1", 7)
    .attr("y1", ((height - margin.top - margin.bottom)/2) + (yLabelSize/2) + 35 )
    .attr("x2", 7)
    .attr("y2", height-margin.bottom - 10)
    .attr("stroke-width", 2)
    .attr("stroke", "#D66E6B")
    .attr("marker-end", "url(#triangle2)");


    svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle3")
    .attr("refX", 6)
    .attr("refY", 5)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("markerUnits","userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .style("fill", "#A6D088");

    //line              
    svg.append("line")
    .attr("x1", 7)
    .attr("y1", ((height - margin.top - margin.bottom)/2) - yLabelSize/2 + 20)
    .attr("x2", 7)
    .attr("y2", margin.top + 20)
    .attr("stroke-width", 2)
    .attr("stroke", "#A6D088")
    .attr("marker-end", "url(#triangle3)");
 


if(!update)
{
  var quadrant_group = svg.select("g")
    .attr("transform", "translate(" + margin.left + ",0)") //Meter isto com ,100 pode ser a solução. tenho é de alterar nos outros tb
    
  
  var quadrant_border = quadrant_group.append("rect")
    .attr("x", 0)
    .attr("y", -margin.top)
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.bottom)
    .attr("rx", 0)
    .attr("ry", 0)
    .attr("class", "quadrant_border")
    .style("fill", "transparent");
    

    //top right rectangle
  	quadrant_group.append("rect")
		.attr("x", (width - margin.left - margin.right)/2)
		.attr("y", 30)
		.attr("width", (width - margin.left - margin.right)/2)
		.attr("height", (height - margin.bottom)/2)
		.attr("rx", 0) //round corner
		.attr("ry", 0) //round corner
		.attr("class", "quadrant_border")
		.style("fill", "#BAD598")
    .style("stroke-width", 3)
		.style("stroke", "white")

// Descrição de cada quadrante (TOP LEFT)
    svg.append("text")
		.attr("x", (margin.left) + 10)
		.attr("y", 40)
    .style('fill', '#A59091')
    .attr("font-family", "Trebuchet MS")
    .style("font-size", "11px")
    .attr('class', 'id')
    .append('svg:tspan')
    .attr('x', (margin.left) + 10)
    .attr('dy', 5)
    .text("O país está a afastar-se")
    .append('svg:tspan')
    .attr('x', (margin.left) + 10)
    .attr('dy', 20)
    .text("destes ODS's mas está em")
    .append('svg:tspan')
    .attr('x', (margin.left) + 10)
    .attr('dy', 20)
    .text("média melhor que a UE")

    // Descrição de cada quadrante (Bottom LEFT)
    svg.append("text")
		.attr("x", (margin.left) + 10)
		.attr("y", height - 105)
    .style('fill', '#A59091')
    .attr("font-family", "Trebuchet MS")
    .style("font-size", "11px")
    .attr('class', 'id')
    .append('svg:tspan')
    .attr('x', (margin.left) + 10)
    .attr('dy', 5)
    .text("O país está a afastar-se")
    .append('svg:tspan')
    .attr('x', (margin.left) + 10)
    .attr('dy', 20)
    .text("destes ODS's e está em")
    .append('svg:tspan')
    .attr('x', (margin.left) + 10)
    .attr('dy', 20)
    .text("média pior que a UE")



    // Descrição de cada quadrante (Bottom Right)
    svg.append("text")
		.attr("x", width - 35)
		.attr("y", height - 105)
    .style('fill', '#A59091')
    .attr("font-family", "Trebuchet MS")
    .style("font-size", "11px")
    .attr('class', 'id')
    .append('svg:tspan')
    .attr('x', width - 35)
    .attr('dy', 5)
    .text("O país vai ao encontro")
    .attr("text-anchor", "end")
    .append('svg:tspan')
    .attr('x', width - 35)
    .attr('dy', 20)
    .text("destes ODS's mas está em")
    .attr("text-anchor", "end")
    .append('svg:tspan')
    .attr('x', width - 35)
    .attr('dy', 20)
    .text("média pior que a UE")
    .attr("text-anchor", "end")

    // Descrição de cada quadrante (TOP Right)
    svg.append("text")
		.attr("x", width - 35)
		.attr("y", 40)
    .style('fill', '#A59091')
    .attr("font-family", "Trebuchet MS")
    .style("font-size", "11px")
    .attr('class', 'id')
    .append('svg:tspan')
    .attr('x', width - 35)
    .attr('dy', 5)
    .text("O país vai ao encontro")
    .attr("text-anchor", "end")
    .append('svg:tspan')
    .attr('x', width - 35)
    .attr('dy', 20)
    .text("destes ODS's e está em")
    .attr("text-anchor", "end")
    .append('svg:tspan')
    .attr('x', width - 35)
    .attr('dy', 20)
    .text("média melhor que a UE")
    .attr("text-anchor", "end")



    var xLabel = svg.append("text")
		.attr("x", (width - margin.right - margin.left)/2)
		.attr("y", height-10)
		.attr("class", "axis wcm-label")
		.text("Score do Progresso")
    .style('fill', '#A59091')
    .attr("font-family", "Trebuchet MS")
    .style("font-size", "12px");



    //bottom left rectangle
    quadrant_group.append("rect")
    .attr("x", 0)
    .attr("y", (height - margin.bottom + 30)/2)
    .attr("width", (width - margin.left - margin.right)/2)
    .attr("height", (height - margin.bottom - 30)/2)
    .attr("rx", 0) //round corner
    .attr("ry", 0) //round corner
    .attr("class", "quadrant_border")
    .style("fill", "#F6D1C9")
    .style("stroke-width", 3)
    .style("stroke", "white")


    //bottom right rectangle
    quadrant_group.append("rect")
      .attr("x", (width - margin.left - margin.right)/2)
      .attr("y", (height - margin.bottom+30)/2)
      .attr("width", (width - margin.left - margin.right)/2)
      .attr("height", (height - margin.bottom-30)/2)
      .attr("rx", 0) //round corner
      .attr("ry", 0) //round corner
      .attr("class", "quadrant_border")
      .style("fill", "#FFF69B")
      .style("stroke-width", 3)
      .style("stroke", "white")


    //top left rectangle
    quadrant_group.append("rect")
      .attr("x", 0)
      .attr("y", 30)
      .attr("width", (width - margin.left - margin.right)/2)
      .attr("height", (height - margin.bottom - 30)/2)
      .attr("rx", 0) //round corner
      .attr("ry", 0) //round corner
      .attr("class", "quadrant_border")
      .style("fill", "#FFF69B")
      .style("stroke-width", 3)
      .style("stroke", "white")
}

// Título

svg.append("text")
		.attr("x", (width - BrowserText.getWidth('Gráfico de Quadrantes - Países UEE', 24, 'Trebuchet MS'))/2)
		.attr("y", 20)
		.attr("class", "axis wcm-label")
		.text("Gráfico de Quadrantes - Países UE")
    .style('fill', '#A59091')
    .attr("font-family", "Trebuchet MS")
    .style("font-size", "24px");

// Tudo o que vem a seguir que fale de defs, é para poder far fill dos circulos com as imagens!
var defs = svg.append("defs")

  defs.selectAll(".artist-pattern")
    .data(dataSet)
    .enter().append("pattern")
    .attr("class", "artist-pattern")
    .attr("id", function(d){
      return d.title;
    })
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("width", 1)
    .attr("height", 1)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", function(d){
      return d.img
    });






 


  svg
    .select("g.circles")
    .selectAll("circle")
    .data(data, function (d) {
      return d.title;
    })   
    .join(
      (enter) => {
        return enter
          .append("circle")
          .attr("cx", (d) => x(d.progresso) - margin.left - 1)
          .attr("cy", (d) => y(d.estado))
          .attr("r", "25")
          //.style("fill", (d) => d.color)
          .style("fill", function(d){
            return "url(#" + d.title +")"
          })
          .on("mouseover", function handleMouseOver(event, d) {
           
            
            
            d3.select("div#scatterPlot").select("svg")
              .selectAll("circle")
              .filter(function (b) {
                if (d.id == b.id) {
                  return b;
                }
              })
              .attr("fill-opacity","0.3");

            let pos = d3.select(this).node().getBoundingClientRect();

            div.transition()		
              .duration(200)		
              .style("opacity", 1)
              .style("background",(b) => 
              {
                if(d.title == "ODS1")
                {
                  b = "#e5243b"
                  return b;
                }
                if(d.title == "ODS2")
                {
                  b = "#DDA63A"
                  return b;
                }
                if(d.title == "ODS3")
                {
                  b = "#4C9F38"
                  return b;
                }
                if(d.title == "ODS4")
                {
                  b = "#C5192D"
                  return b;
                }
                if(d.title == "ODS5")
                {
                  b = "#FF3A21"
                  return b;
                }
                if(d.title == "ODS6")
                {
                  b = "#26BDE2"
                  return b;
                }
                if(d.title == "ODS7")
                {
                  b = "#FCC30B"
                  return b;
                }
                if(d.title == "ODS8")
                {
                  b = "#A21942"
                  return b;
                }
                if(d.title == "ODS9")
                {
                  b = "#FD6925"
                  return b;
                }
                if(d.title == "ODS10")
                {
                  b = "#DD1367"
                  return b;
                }
                if(d.title == "ODS11")
                {
                  b = "#FD9D24"
                  return b;
                }
                if(d.title == "ODS12")
                {
                  b = "#BF8B2E"
                  return b;
                }
                if(d.title == "ODS13")
                {
                  b = "#3F7E44"
                  return b;
                }
              });

  
            div.html("<strong>" + d.title + "</strong> " +
              "</br> " + d.Descricao + "</br> " +  "</br> " + "<strong>" + "Estado: " + "</strong>" + d3.format(",.2f")(d.estado)
              + "</br> " +  "<strong>" + "Progresso: " + "</strong>" + d3.format(",.2f")(d.progresso))      
              .style('left', `${pos['x']}px`)
              .style('top', `${(window.pageYOffset  + pos['y'] - 50)}px`);
           
          
          })
          .on("mousemove", function mousemove(d) {
            
          })
          .on("mouseleave", function mouseLeave(d)
          {
            d3.select("div#scatterPlot")
            .select("svg")
            .selectAll("circle")
            .style("fill", function(d){
              return "url(#" + d.title +")"
            })
            .attr("fill-opacity","1");
                  
            div.transition()		
            .duration(500)		
            .style("opacity", 0)
            .style("background", "transparent");
          
          
          })
            
            //.on("click", handleClick)
            .transition()
            .duration(1000)
            .style("opacity", "100%")
      },
      (update) => {
        update
          .transition()
          .duration(1000)
          .attr("cx", (d) => x(d.progresso) - margin.left - 1)
          .attr("cy", (d) => y(d.estado))
          .attr("r", "25")
          .style("fill", function(d){
            return "url(#" + d.title +")"
          })
      },
      (exit) => {
        exit.remove();
      }
    );



  if (!update) {
    svg.append("g").attr("class", "scatterXAxis");
    svg.append("g").attr("class", "scatterYAxis");
    svg.append("g").attr("class", "scatterGrid").call(grid);
  } else {
  }
  d3.select("g.scatterXAxis").call(xAxis);
  d3.select("g.scatterYAxis").call(yAxis);
}


// New Code

function dataChange(value) {
 /*  d3.json("data/data.json")
    .then((data) => { */
      newData = data;
      switch (value) {
        case "Alemanha":
          newData = data.filter(function (d) {
            if (d.country == "de") {
              return d;
            }
          })         
          ;
          break;
        case "Áustria":
          newData = data.filter(function (d) {
            if (d.country == "at") {
              return d;
            }
          });
          break;
        case "Bélgica":
          newData = data.filter(function (d) {
            if (d.country == "be") {
              return d;
            }
          });
          break;
        case "Bulgária":
          newData = data.filter(function (d) {
            if (d.country == "bg") {
              return d;
            }
          });
          break;
        case "Chipre":
          newData = data.filter(function (d) {
            if (d.country == "cy") {
              return d;
            }
          });
          break;
        case "Croácia":
            newData = data.filter(function (d) {
              if (d.country == "hr") {
                   return d;
                   }
                 });
              break;
        case "Dinamarca":
          newData = data.filter(function (d) {
            if (d.country == "dk") {
              return d;
            }
          });
          break;
        case "Eslováquia":
          newData = data.filter(function (d) {
            if (d.country == "sk") {
              return d;
            }
          });
          break;
        case "Eslovénia":
          newData = data.filter(function (d) {
            if (d.country == "si") {
              return d;
            }
          });
          break;
        case "Espanha":
          newData = data.filter(function (d) {
            if (d.country == "es") {
              return d;
            }
          });
          break;
        case "Estónia":
          newData = data.filter(function (d) {
            if (d.country == "ee") {
              return d;
            }
          });
          break;
        case "Finlândia":
          newData = data.filter(function (d) {
            if (d.country == "fi") {
              return d;
            }
          });
          break;
        case "França":
          newData = data.filter(function (d) {
            if (d.country == "fr") {
              return d;
            }
          });
          break;
        case "Grécia":
          newData = data.filter(function (d) {
            if (d.country == "gr") {
              return d;
            }
          });
          break;
        case "Hungria":
          newData = data.filter(function (d) {
            if (d.country == "hu") {
              return d;
            }
          });
          break;
        case "Irlanda":
          newData = data.filter(function (d) {
            if (d.country == "ie") {
              return d;
            }
          });
          break;
        case "Itália":
          newData = data.filter(function (d) {
            if (d.country == "it") {
              return d;
            }
          });
          break;
        case "Letónia":
          newData = data.filter(function (d) {
            if (d.country == "lv") {
              return d;
            }
          });
          break;
        case "Lituânia":
          newData = data.filter(function (d) {
            if (d.country == "lt") {
              return d;
            }
          });
          break;
        case "Luxemburgo":
          newData = data.filter(function (d) {
            if (d.country == "lu") {
              return d;
            }
          });
          break;
        case "Malta":
          newData = data.filter(function (d) {
            if (d.country == "mt") {
              return d;
            }
          });
          break;
        case "Países Baixos":
          newData = data.filter(function (d) {
            if (d.country == "nl") {
              return d;
            }
          });
          break;
        case "Polónia":
          newData = data.filter(function (d) {
            if (d.country == "pl") {
              return d;
            }
          });
          break;
        case "Portugal":
          newData = data.filter(function (d) {
            if (d.country == "pt") {
              return d;
            }
          });
          break;
        case "República Checa":
          newData = data.filter(function (d) {
            if (d.country == "cz") {
              return d;
            }
          });
          break;
        case "Roménia":
          newData = data.filter(function (d) {
            if (d.country == "ro") {
              return d;
            }
          });
          break;
        case "Suécia":
          newData = data.filter(function (d) {
            if (d.country == "se") {
              return d;
            }
          });
          break;
        default:
          break;
      }
      createScatterPlot(newData, true);
}



function handleClick(event, d) {
  window.alert(d.title);
}

function calculateFill(dataItem, i) {
  var scale = d3
    .scaleLinear()
    .domain([d3.min(dataSet, (d) => d.progresso), d3.max(dataSet, (d) => d.progresso)])
    .range([0, 1]);
  return d3.interpolateWarm(scale(dataItem.progresso));
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




var data = [
  {
    "id": 1,
    "title": "ODS1",
    "progresso": 3.5,
    "estado": 7.760218067,
    "country": "de",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 2,
    "title": "ODS1",
    "progresso": 2.4,
    "estado": 22.14600475,
    "country": "at",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 3,
    "title": "ODS1",
    "progresso": 2.9,
    "estado": 9.105939003,
    "country": "be",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 4,
    "title": "ODS1",
    "progresso": 3.7,
    "estado": -47.99728901,
    "country": "bg",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 5,
    "title": "ODS1",
    "progresso": 2.9,
    "estado": -4.52134046,
    "country": "cy",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 6,
    "title": "ODS1",
    "progresso": 4.7,
    "estado": -3.405721165,
    "country": "hr",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 7,
    "title": "ODS1",
    "progresso": 0.5,
    "estado": 19.24744663,
    "country": "dk",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 8,
    "title": "ODS1",
    "progresso": 1.8,
    "estado": 15.28601695,
    "country": "sk",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 9,
    "title": "ODS1",
    "progresso": 4,
    "estado": 25.27370205,
    "country": "si",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 10,
    "title": "ODS1",
    "progresso": 2.3,
    "estado": -7.133389295,
    "country": "es",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 11,
    "title": "ODS1",
    "progresso": 2,
    "estado": -11.44599651,
    "country": "ee",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 12,
    "title": "ODS1",
    "progresso": 1.7,
    "estado": 28.72115429,
    "country": "fi",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 13,
    "title": "ODS1",
    "progresso": 1.9,
    "estado": 17.59904469,
    "country": "fr",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 14,
    "title": "ODS1",
    "progresso": 4.2,
    "estado": -38.10193671,
    "country": "gr",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 15,
    "title": "ODS1",
    "progresso": 4,
    "estado": 7.130379454,
    "country": "hu",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 16,
    "title": "ODS1",
    "progresso": 4,
    "estado": 11.31582706,
    "country": "ie",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 17,
    "title": "ODS1",
    "progresso": 1.8,
    "estado": -17.391411,
    "country": "it",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 18,
    "title": "ODS1",
    "progresso": 2.6,
    "estado": -27.68200687,
    "country": "lv",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 19,
    "title": "ODS1",
    "progresso": 3,
    "estado": -23.04865303,
    "country": "lt",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 20,
    "title": "ODS1",
    "progresso": -2.2,
    "estado": 10.34285304,
    "country": "lu",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 21,
    "title": "ODS1",
    "progresso": 3,
    "estado": 7.856779952,
    "country": "mt",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 22,
    "title": "ODS1",
    "progresso": 0.7,
    "estado": 8.188689809,
    "country": "nl",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 23,
    "title": "ODS1",
    "progresso": 3.9,
    "estado": 6.00406998,
    "country": "pl",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 24,
    "title": "ODS1",
    "progresso": 4.4,
    "estado": -6.123286444,
    "country": "pt",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 25,
    "title": "ODS1",
    "progresso": 3.4,
    "estado": 39.38257396,
    "country": "cz",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 26,
    "title": "ODS1",
    "progresso": 4.6,
    "estado": -49.55601978,
    "country": "ro",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 27,
    "title": "ODS1",
    "progresso": -0.5,
    "estado": 1.046350571,
    "country": "se",
    "color": "#EA1B2D",
    "img": "data/ods1.png",
    "Descricao": "Erradicar a Pobreza"
  },
  {
    "id": 28,
    "title": "ODS2",
    "progresso": 2.542823313,
    "estado": -1.660438403,
    "country": "de",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 29,
    "title": "ODS2",
    "progresso": 1.207845929,
    "estado": 12.82424726,
    "country": "at",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 30,
    "title": "ODS2",
    "progresso": 1.28001063,
    "estado": -2.87947293,
    "country": "be",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 31,
    "title": "ODS2",
    "progresso": 1.467504208,
    "estado": 7.677981723,
    "country": "bg",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 32,
    "title": "ODS2",
    "progresso": 0.98752335,
    "estado": -30.51045175,
    "country": "cy",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 33,
    "title": "ODS2",
    "progresso": 3.280509454,
    "estado": -21.43881096,
    "country": "hr",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 34,
    "title": "ODS2",
    "progresso": 2.627739949,
    "estado": 30.91774487,
    "country": "dk",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 35,
    "title": "ODS2",
    "progresso": 2.902964648,
    "estado": 21.50602798,
    "country": "sk",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 36,
    "title": "ODS2",
    "progresso": 0.962003663,
    "estado": 0.195864615,
    "country": "si",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 37,
    "title": "ODS2",
    "progresso": 2.08827895,
    "estado": 16.80501987,
    "country": "es",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 38,
    "title": "ODS2",
    "progresso": 0.739975913,
    "estado": 15.19826884,
    "country": "ee",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 39,
    "title": "ODS2",
    "progresso": 1.307159707,
    "estado": -27.70200543,
    "country": "fi",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 40,
    "title": "ODS2",
    "progresso": -0.634820029,
    "estado": 11.63949354,
    "country": "fr",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 41,
    "title": "ODS2",
    "progresso": 4.166666667,
    "estado": 6.885771325,
    "country": "gr",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 42,
    "title": "ODS2",
    "progresso": 1.6642454,
    "estado": 4.673007636,
    "country": "hu",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 43,
    "title": "ODS2",
    "progresso": 1.125621243,
    "estado": 23.918678,
    "country": "ie",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 44,
    "title": "ODS2",
    "progresso": 2.128650337,
    "estado": -0.157249605,
    "country": "it",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 45,
    "title": "ODS2",
    "progresso": 1.749426146,
    "estado": -2.962741985,
    "country": "lv",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 46,
    "title": "ODS2",
    "progresso": 2.303799669,
    "estado": -0.871026344,
    "country": "lt",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 47,
    "title": "ODS2",
    "progresso": 1.470293781,
    "estado": -7.547720297,
    "country": "lu",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 48,
    "title": "ODS2",
    "progresso": 2.703588804,
    "estado": -70.38650079,
    "country": "mt",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 49,
    "title": "ODS2",
    "progresso": -1.098407596,
    "estado": -8.40813682,
    "country": "nl",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 50,
    "title": "ODS2",
    "progresso": 1.197832094,
    "estado": -15.13528909,
    "country": "pl",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 51,
    "title": "ODS2",
    "progresso": 0.842438466,
    "estado": 13.72026234,
    "country": "pt",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 52,
    "title": "ODS2",
    "progresso": 4.542286667,
    "estado": 31.54005384,
    "country": "cz",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 53,
    "title": "ODS2",
    "progresso": 1.893518539,
    "estado": -28.96100427,
    "country": "ro",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 54,
    "title": "ODS2",
    "progresso": 1.315673361,
    "estado": 21.11842683,
    "country": "se",
    "color": "#D19E28",
    "img": "data/ods2.png",
    "Descricao": "Erradicar a Fome"
  },
  {
    "id": 55,
    "title": "ODS3",
    "progresso": 2.267873374,
    "estado": 13.67940954,
    "country": "de",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 56,
    "title": "ODS3",
    "progresso": 1.253072618,
    "estado": 10.24705493,
    "country": "at",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 57,
    "title": "ODS3",
    "progresso": 2.556504243,
    "estado": 16.00080908,
    "country": "be",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 58,
    "title": "ODS3",
    "progresso": 3.176693162,
    "estado": -25.25733889,
    "country": "bg",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 59,
    "title": "ODS3",
    "progresso": 1.799843827,
    "estado": 16.40780515,
    "country": "cy",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 60,
    "title": "ODS3",
    "progresso": 1.663730375,
    "estado": -9.755620962,
    "country": "hr",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 61,
    "title": "ODS3",
    "progresso": 0.050029372,
    "estado": 6.504781312,
    "country": "dk",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 62,
    "title": "ODS3",
    "progresso": 2.094661253,
    "estado": -2.464456221,
    "country": "sk",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 63,
    "title": "ODS3",
    "progresso": 0.406914748,
    "estado": 11.04731202,
    "country": "si",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 64,
    "title": "ODS3",
    "progresso": 1.149578229,
    "estado": 22.90670217,
    "country": "es",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 65,
    "title": "ODS3",
    "progresso": 2.555622397,
    "estado": -14.22446099,
    "country": "ee",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 66,
    "title": "ODS3",
    "progresso": 0.569102335,
    "estado": 15.39426207,
    "country": "fi",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 67,
    "title": "ODS3",
    "progresso": -0.151108474,
    "estado": 13.60235405,
    "country": "fr",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 68,
    "title": "ODS3",
    "progresso": 1.563746057,
    "estado": 12.35462579,
    "country": "gr",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 69,
    "title": "ODS3",
    "progresso": 1.563731282,
    "estado": -15.88116971,
    "country": "hu",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 70,
    "title": "ODS3",
    "progresso": 3.29797971,
    "estado": 19.01675127,
    "country": "ie",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 71,
    "title": "ODS3",
    "progresso": 3.573564012,
    "estado": 11.94082107,
    "country": "it",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 72,
    "title": "ODS3",
    "progresso": 3.642346875,
    "estado": -41.48035924,
    "country": "lv",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 73,
    "title": "ODS3",
    "progresso": 3.449507504,
    "estado": -32.18463289,
    "country": "lt",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 74,
    "title": "ODS3",
    "progresso": 1.353028812,
    "estado": 11.36741581,
    "country": "lu",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 75,
    "title": "ODS3",
    "progresso": 1.342471855,
    "estado": 1.505020776,
    "country": "mt",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 76,
    "title": "ODS3",
    "progresso": 0.027963152,
    "estado": 20.35882379,
    "country": "nl",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 77,
    "title": "ODS3",
    "progresso": 2.737003963,
    "estado": -18.01917081,
    "country": "pl",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 78,
    "title": "ODS3",
    "progresso": 1.448350641,
    "estado": -11.87520496,
    "country": "pt",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 79,
    "title": "ODS3",
    "progresso": 2.694460916,
    "estado": -7.200191735,
    "country": "cz",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 80,
    "title": "ODS3",
    "progresso": 2.226373255,
    "estado": -53.218994,
    "country": "ro",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 81,
    "title": "ODS3",
    "progresso": 0.815849726,
    "estado": 29.22765157,
    "country": "se",
    "color": "#269A45",
    "img": "data/ods3.png",
    "Descricao": "Saúde de Qualidade"
  },
  {
    "id": 82,
    "title": "ODS4",
    "progresso": -2.687948316,
    "estado": -26.57756112,
    "country": "de",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 83,
    "title": "ODS4",
    "progresso": -1.059041002,
    "estado": 10.33281402,
    "country": "at",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 84,
    "title": "ODS4",
    "progresso": 2.241865285,
    "estado": 12.8805335,
    "country": "be",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 85,
    "title": "ODS4",
    "progresso": -1.16640584,
    "estado": -50.5304034,
    "country": "bg",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 86,
    "title": "ODS4",
    "progresso": 0.861570311,
    "estado": -1.81681561,
    "country": "cy",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 87,
    "title": "ODS4",
    "progresso": 3.292364031,
    "estado": -21.73386957,
    "country": "hr",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 88,
    "title": "ODS4",
    "progresso": -1.47600794,
    "estado": 25.83068849,
    "country": "dk",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 89,
    "title": "ODS4",
    "progresso": 1.276583878,
    "estado": -22.38946834,
    "country": "sk",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 90,
    "title": "ODS4",
    "progresso": 1.072662955,
    "estado": 15.6369599,
    "country": "si",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 91,
    "title": "ODS4",
    "progresso": 3.873620488,
    "estado": -5.058277335,
    "country": "es",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 92,
    "title": "ODS4",
    "progresso": 1.97625141,
    "estado": 23.07012576,
    "country": "ee",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 93,
    "title": "ODS4",
    "progresso": 2.72290139,
    "estado": 25.16073497,
    "country": "fi",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 94,
    "title": "ODS4",
    "progresso": 1.882760555,
    "estado": 15.14186747,
    "country": "fr",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 95,
    "title": "ODS4",
    "progresso": 3.039149403,
    "estado": -27.79752621,
    "country": "gr",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 96,
    "title": "ODS4",
    "progresso": -0.342634602,
    "estado": -14.40524606,
    "country": "hu",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 97,
    "title": "ODS4",
    "progresso": 1.804744107,
    "estado": 34.72890793,
    "country": "ie",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 98,
    "title": "ODS4",
    "progresso": 1.363406909,
    "estado": -35.26373326,
    "country": "it",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 99,
    "title": "ODS4",
    "progresso": 2.199716146,
    "estado": 9.772713639,
    "country": "lv",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 100,
    "title": "ODS4",
    "progresso": 0.96027015,
    "estado": 9.843495647,
    "country": "lt",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 101,
    "title": "ODS4",
    "progresso": -0.594916342,
    "estado": 23.00962486,
    "country": "lu",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 102,
    "title": "ODS4",
    "progresso": 1.772192075,
    "estado": -11.58028165,
    "country": "mt",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 103,
    "title": "ODS4",
    "progresso": 0.858354711,
    "estado": 31.85064194,
    "country": "nl",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 104,
    "title": "ODS4",
    "progresso": 3.053034999,
    "estado": 12.02835057,
    "country": "pl",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 105,
    "title": "ODS4",
    "progresso": 1.756991759,
    "estado": -0.357898391,
    "country": "pt",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 106,
    "title": "ODS4",
    "progresso": 0.911377612,
    "estado": -5.505872788,
    "country": "cz",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 107,
    "title": "ODS4",
    "progresso": -0.145953605,
    "estado": -61.54431545,
    "country": "ro",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 108,
    "title": "ODS4",
    "progresso": 0.21212842,
    "estado": 35.27381048,
    "country": "se",
    "color": "#C11E31",
    "img": "data/ods4.png",
    "Descricao": "Educação de Qualidade"
  },
  {
    "id": 109,
    "title": "ODS5",
    "progresso": 2.581380829,
    "estado": 2.639588461,
    "country": "de",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 110,
    "title": "ODS5",
    "progresso": 4.461655288,
    "estado": 7.31252876,
    "country": "at",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 111,
    "title": "ODS5",
    "progresso": 2.341189932,
    "estado": 44.05028913,
    "country": "be",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 112,
    "title": "ODS5",
    "progresso": 0.050444108,
    "estado": -1.229066218,
    "country": "bg",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 113,
    "title": "ODS5",
    "progresso": 2.142857143,
    "estado": -31.82848034,
    "country": "cy",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 114,
    "title": "ODS5",
    "progresso": -0.714285714,
    "estado": -6.868800566,
    "country": "hr",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 115,
    "title": "ODS5",
    "progresso": 3.852687282,
    "estado": 32.22361255,
    "country": "dk",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 116,
    "title": "ODS5",
    "progresso": 3.341457382,
    "estado": -22.40835192,
    "country": "sk",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 117,
    "title": "ODS5",
    "progresso": -1.174225751,
    "estado": 12.33763623,
    "country": "si",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 118,
    "title": "ODS5",
    "progresso": 3.847344459,
    "estado": 15.90483596,
    "country": "es",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 119,
    "title": "ODS5",
    "progresso": 2.739846489,
    "estado": -26.71998818,
    "country": "ee",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 120,
    "title": "ODS5",
    "progresso": 3.571428571,
    "estado": 53.44421938,
    "country": "fi",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 121,
    "title": "ODS5",
    "progresso": 2.794535633,
    "estado": 43.14009969,
    "country": "fr",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 122,
    "title": "ODS5",
    "progresso": 0.86836309,
    "estado": -49.49597435,
    "country": "gr",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 123,
    "title": "ODS5",
    "progresso": -0.714285714,
    "estado": -52.81530107,
    "country": "hu",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 124,
    "title": "ODS5",
    "progresso": 4.303058029,
    "estado": -7.675765525,
    "country": "ie",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 125,
    "title": "ODS5",
    "progresso": 2.892928786,
    "estado": 3.108141185,
    "country": "it",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 126,
    "title": "ODS5",
    "progresso": 1.036608061,
    "estado": 3.530032038,
    "country": "lv",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 127,
    "title": "ODS5",
    "progresso": 2.030353529,
    "estado": 13.09282886,
    "country": "lt",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 128,
    "title": "ODS5",
    "progresso": 3.259092587,
    "estado": 4.293595676,
    "country": "lu",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 129,
    "title": "ODS5",
    "progresso": 0.281633222,
    "estado": -66.81713177,
    "country": "mt",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 130,
    "title": "ODS5",
    "progresso": 3.251872794,
    "estado": 29.8225053,
    "country": "nl",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 131,
    "title": "ODS5",
    "progresso": -0.713066821,
    "estado": -23.44812814,
    "country": "pl",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 132,
    "title": "ODS5",
    "progresso": 3.733687033,
    "estado": 21.6921569,
    "country": "pt",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 133,
    "title": "ODS5",
    "progresso": 3.007530248,
    "estado": -44.22907211,
    "country": "cz",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 134,
    "title": "ODS5",
    "progresso": 0.593870917,
    "estado": -18.45953189,
    "country": "ro",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 135,
    "title": "ODS5",
    "progresso": 2.630870762,
    "estado": 65.40352197,
    "country": "se",
    "color": "#EF4129",
    "img": "data/ods5.png",
    "Descricao": "Igualdade de Género"
  },
  {
    "id": 136,
    "title": "ODS6",
    "progresso": -1.16907552,
    "estado": 11.3209939,
    "country": "de",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 137,
    "title": "ODS6",
    "progresso": 4.521771034,
    "estado": 9.085529942,
    "country": "at",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 138,
    "title": "ODS6",
    "progresso": 2.65818761,
    "estado": 17.32088988,
    "country": "be",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 139,
    "title": "ODS6",
    "progresso": 0.605310669,
    "estado": -22.27797991,
    "country": "bg",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 140,
    "title": "ODS6",
    "progresso": -0.147185676,
    "estado": -35.8703797,
    "country": "cy",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 141,
    "title": "ODS6",
    "progresso": 3.293087807,
    "estado": -12.23359214,
    "country": "hr",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 142,
    "title": "ODS6",
    "progresso": 2.069703772,
    "estado": 27.86924835,
    "country": "dk",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 143,
    "title": "ODS6",
    "progresso": 0.192429114,
    "estado": -33.00084499,
    "country": "sk",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 144,
    "title": "ODS6",
    "progresso": 4.816446848,
    "estado": 17.57764927,
    "country": "si",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 145,
    "title": "ODS6",
    "progresso": -0.65281052,
    "estado": 20.96886612,
    "country": "es",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 146,
    "title": "ODS6",
    "progresso": 1.766057855,
    "estado": 14.58356176,
    "country": "ee",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 147,
    "title": "ODS6",
    "progresso": 3.382349804,
    "estado": 25.62029996,
    "country": "fi",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 148,
    "title": "ODS6",
    "progresso": 1.399840763,
    "estado": 18.38372002,
    "country": "fr",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 149,
    "title": "ODS6",
    "progresso": 5,
    "estado": 30.10333334,
    "country": "gr",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 150,
    "title": "ODS6",
    "progresso": 5,
    "estado": -12.0854707,
    "country": "hu",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 151,
    "title": "ODS6",
    "progresso": -3.304219717,
    "estado": 27.38343169,
    "country": "ie",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 152,
    "title": "ODS6",
    "progresso": -2.230320991,
    "estado": 37.35603786,
    "country": "it",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 153,
    "title": "ODS6",
    "progresso": 5,
    "estado": 18.37369956,
    "country": "lv",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 154,
    "title": "ODS6",
    "progresso": 4.480106339,
    "estado": 12.68232204,
    "country": "lt",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 155,
    "title": "ODS6",
    "progresso": -5,
    "estado": -17.38087779,
    "country": "lu",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 156,
    "title": "ODS6",
    "progresso": -0.386909466,
    "estado": -76.47695687,
    "country": "mt",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 157,
    "title": "ODS6",
    "progresso": 2.063140885,
    "estado": 24.32047547,
    "country": "nl",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 158,
    "title": "ODS6",
    "progresso": 0.883261123,
    "estado": -20.63253611,
    "country": "pl",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 159,
    "title": "ODS6",
    "progresso": 2.402266179,
    "estado": 25.77234392,
    "country": "pt",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 160,
    "title": "ODS6",
    "progresso": 1.591966766,
    "estado": 0.669939363,
    "country": "cz",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 161,
    "title": "ODS6",
    "progresso": 5,
    "estado": -66.90590435,
    "country": "ro",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 162,
    "title": "ODS6",
    "progresso": 5,
    "estado": -42.52779988,
    "country": "se",
    "color": "#00ADD8",
    "img": "data/ods6.png",
    "Descricao": "Água Potável e Saneamento"
  },
  {
    "id": 163,
    "title": "ODS7",
    "progresso": 1.64711902,
    "estado": -29.14833559,
    "country": "de",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 164,
    "title": "ODS7",
    "progresso": 0.260261278,
    "estado": 5.156626282,
    "country": "at",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 165,
    "title": "ODS7",
    "progresso": 1.52504582,
    "estado": -18.9145679,
    "country": "be",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 166,
    "title": "ODS7",
    "progresso": 1.555216052,
    "estado": -18.88389601,
    "country": "bg",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 167,
    "title": "ODS7",
    "progresso": 1.212724505,
    "estado": -24.98158435,
    "country": "cy",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 168,
    "title": "ODS7",
    "progresso": 0.378449383,
    "estado": 8.495324615,
    "country": "hr",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 169,
    "title": "ODS7",
    "progresso": 1.39868693,
    "estado": 33.75745645,
    "country": "dk",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 170,
    "title": "ODS7",
    "progresso": -1.984736145,
    "estado": -3.603702859,
    "country": "sk",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 171,
    "title": "ODS7",
    "progresso": 0.900129636,
    "estado": 9.592467859,
    "country": "si",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 172,
    "title": "ODS7",
    "progresso": 1.701106207,
    "estado": -2.334335477,
    "country": "es",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 173,
    "title": "ODS7",
    "progresso": 2.317846323,
    "estado": 18.35562359,
    "country": "ee",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 174,
    "title": "ODS7",
    "progresso": 1.521982331,
    "estado": 9.039527104,
    "country": "fi",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 175,
    "title": "ODS7",
    "progresso": 1.117159351,
    "estado": -12.87516843,
    "country": "fr",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 176,
    "title": "ODS7",
    "progresso": 0.785104537,
    "estado": -5.896990134,
    "country": "gr",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 177,
    "title": "ODS7",
    "progresso": -1.011632743,
    "estado": -2.214433643,
    "country": "hu",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 178,
    "title": "ODS7",
    "progresso": 2.545233944,
    "estado": 18.10775668,
    "country": "ie",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 179,
    "title": "ODS7",
    "progresso": 1.297473874,
    "estado": -14.78553386,
    "country": "it",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 180,
    "title": "ODS7",
    "progresso": 1.024338391,
    "estado": 16.32937265,
    "country": "lv",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 181,
    "title": "ODS7",
    "progresso": 0.436898959,
    "estado": -27.02029224,
    "country": "lt",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 182,
    "title": "ODS7",
    "progresso": 1.655789285,
    "estado": -16.40768455,
    "country": "lu",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 183,
    "title": "ODS7",
    "progresso": 0.857562134,
    "estado": 6.901013483,
    "country": "mt",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 184,
    "title": "ODS7",
    "progresso": -0.021601391,
    "estado": -13.39406789,
    "country": "nl",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 185,
    "title": "ODS7",
    "progresso": 0.957717605,
    "estado": -4.123659785,
    "country": "pl",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 186,
    "title": "ODS7",
    "progresso": 0.351066492,
    "estado": 3.260940203,
    "country": "pt",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 187,
    "title": "ODS7",
    "progresso": 0.864672953,
    "estado": 7.259695222,
    "country": "cz",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 188,
    "title": "ODS7",
    "progresso": 0.086499709,
    "estado": 22.77823323,
    "country": "ro",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 189,
    "title": "ODS7",
    "progresso": 2.071484407,
    "estado": 35.55021535,
    "country": "se",
    "color": "#FBB611",
    "img": "data/ods7.png",
    "Descricao": "Energias Renováveis e Acessíveis"
  },
  {
    "id": 190,
    "title": "ODS8",
    "progresso": 2.187342754,
    "estado": 16.6881434,
    "country": "de",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 191,
    "title": "ODS8",
    "progresso": 2.196161621,
    "estado": 8.821411931,
    "country": "at",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 192,
    "title": "ODS8",
    "progresso": 2.650919721,
    "estado": -6.692962969,
    "country": "be",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 193,
    "title": "ODS8",
    "progresso": 3.467939437,
    "estado": -21.38177115,
    "country": "bg",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 194,
    "title": "ODS8",
    "progresso": 3.697917081,
    "estado": -15.9698753,
    "country": "cy",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 195,
    "title": "ODS8",
    "progresso": 1.465846901,
    "estado": -8.761489035,
    "country": "hr",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 196,
    "title": "ODS8",
    "progresso": 2.562458809,
    "estado": 36.75902386,
    "country": "dk",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 197,
    "title": "ODS8",
    "progresso": 3.132556935,
    "estado": -12.09535813,
    "country": "sk",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 198,
    "title": "ODS8",
    "progresso": 2.438895366,
    "estado": 0.544212535,
    "country": "si",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 199,
    "title": "ODS8",
    "progresso": 3.234406407,
    "estado": -21.72161146,
    "country": "es",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 200,
    "title": "ODS8",
    "progresso": 3.078331615,
    "estado": 15.5985924,
    "country": "ee",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 201,
    "title": "ODS8",
    "progresso": 2.97291734,
    "estado": 19.63725363,
    "country": "fi",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 202,
    "title": "ODS8",
    "progresso": 1.816076153,
    "estado": -7.133196889,
    "country": "fr",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 203,
    "title": "ODS8",
    "progresso": 0.310796794,
    "estado": -33.85704745,
    "country": "gr",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 204,
    "title": "ODS8",
    "progresso": 2.29072761,
    "estado": 6.004540851,
    "country": "hu",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 205,
    "title": "ODS8",
    "progresso": 3.768879676,
    "estado": 14.1165533,
    "country": "ie",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 206,
    "title": "ODS8",
    "progresso": 0.521587699,
    "estado": -40.15596417,
    "country": "it",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 207,
    "title": "ODS8",
    "progresso": 3.022738616,
    "estado": -11.05596348,
    "country": "lv",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 208,
    "title": "ODS8",
    "progresso": 1.448581538,
    "estado": -3.321570972,
    "country": "lt",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 209,
    "title": "ODS8",
    "progresso": -0.59147534,
    "estado": 16.73271459,
    "country": "lu",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 210,
    "title": "ODS8",
    "progresso": 2.28956444,
    "estado": 24.56426655,
    "country": "mt",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 211,
    "title": "ODS8",
    "progresso": 3.354745352,
    "estado": 30.84512581,
    "country": "nl",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 212,
    "title": "ODS8",
    "progresso": 1.775245621,
    "estado": -14.20444696,
    "country": "pl",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 213,
    "title": "ODS8",
    "progresso": 3.125515585,
    "estado": 0.735756075,
    "country": "pt",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 214,
    "title": "ODS8",
    "progresso": 1.544118935,
    "estado": -11.69613967,
    "country": "cz",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 215,
    "title": "ODS8",
    "progresso": 2.32915655,
    "estado": -27.65808762,
    "country": "ro",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 216,
    "title": "ODS8",
    "progresso": 1.623854002,
    "estado": 44.6578903,
    "country": "se",
    "color": "#8E1737",
    "img": "data/ods8.png",
    "Descricao": "Trabalho Digno e Crescimento Económico"
  },
  {
    "id": 217,
    "title": "ODS9",
    "progresso": 2.192515328,
    "estado": 27.54539127,
    "country": "de",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 218,
    "title": "ODS9",
    "progresso": 2.113836621,
    "estado": 46.36264723,
    "country": "at",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 219,
    "title": "ODS9",
    "progresso": 1.470614516,
    "estado": 35.9684925,
    "country": "be",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 220,
    "title": "ODS9",
    "progresso": 2.109132635,
    "estado": -45.51207716,
    "country": "bg",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 221,
    "title": "ODS9",
    "progresso": 3.480502164,
    "estado": -35.75005329,
    "country": "cy",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 222,
    "title": "ODS9",
    "progresso": 3.484744617,
    "estado": -33.82226542,
    "country": "hr",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 223,
    "title": "ODS9",
    "progresso": 0.686980649,
    "estado": 55.74438529,
    "country": "dk",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 224,
    "title": "ODS9",
    "progresso": 1.635733251,
    "estado": -28.81939185,
    "country": "sk",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 225,
    "title": "ODS9",
    "progresso": 1.13629804,
    "estado": 4.27409819,
    "country": "si",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 226,
    "title": "ODS9",
    "progresso": 0.610553927,
    "estado": -32.52839659,
    "country": "es",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 227,
    "title": "ODS9",
    "progresso": 2.731435927,
    "estado": -5.457801492,
    "country": "ee",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 228,
    "title": "ODS9",
    "progresso": -0.419849313,
    "estado": 49.8941722,
    "country": "fi",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 229,
    "title": "ODS9",
    "progresso": -0.318299051,
    "estado": 15.88893776,
    "country": "fr",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 230,
    "title": "ODS9",
    "progresso": 2.544223057,
    "estado": -29.25065116,
    "country": "gr",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 231,
    "title": "ODS9",
    "progresso": 1.334988805,
    "estado": -6.285896866,
    "country": "hu",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 232,
    "title": "ODS9",
    "progresso": 1.080666136,
    "estado": 3.776929211,
    "country": "ie",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 233,
    "title": "ODS9",
    "progresso": 0.979134873,
    "estado": -19.41679517,
    "country": "it",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 234,
    "title": "ODS9",
    "progresso": -0.569823139,
    "estado": -18.64284111,
    "country": "lv",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 235,
    "title": "ODS9",
    "progresso": 2.591258562,
    "estado": -23.95194116,
    "country": "lt",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 236,
    "title": "ODS9",
    "progresso": -0.696939604,
    "estado": 31.26791779,
    "country": "lu",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 237,
    "title": "ODS9",
    "progresso": -0.675186612,
    "estado": -15.23343246,
    "country": "mt",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 238,
    "title": "ODS9",
    "progresso": 1.06590889,
    "estado": 62.39990166,
    "country": "nl",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 239,
    "title": "ODS9",
    "progresso": 0.330365433,
    "estado": -25.50291628,
    "country": "pl",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 240,
    "title": "ODS9",
    "progresso": 3.453554966,
    "estado": -25.04259591,
    "country": "pt",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 241,
    "title": "ODS9",
    "progresso": 0.419178754,
    "estado": 1.096084105,
    "country": "cz",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 242,
    "title": "ODS9",
    "progresso": 1.162909338,
    "estado": -45.77794708,
    "country": "ro",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 243,
    "title": "ODS9",
    "progresso": 2.958966894,
    "estado": 56.77604579,
    "country": "se",
    "color": "#F26D22",
    "img": "data/ods9.png",
    "Descricao": "Indústria, Inovação e Infraestruturas"
  },
  {
    "id": 244,
    "title": "ODS10",
    "progresso": 1.527557944,
    "estado": 25.2005349,
    "country": "de",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 245,
    "title": "ODS10",
    "progresso": -0.257418871,
    "estado": 18.45307643,
    "country": "at",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 246,
    "title": "ODS10",
    "progresso": 3.516923769,
    "estado": 31.65541253,
    "country": "be",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 247,
    "title": "ODS10",
    "progresso": 1,
    "estado": -35.82747102,
    "country": "bg",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 248,
    "title": "ODS10",
    "progresso": 3.517213825,
    "estado": 47.17554536,
    "country": "cy",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 249,
    "title": "ODS10",
    "progresso": 3.344363301,
    "estado": -35.73686063,
    "country": "hr",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 250,
    "title": "ODS10",
    "progresso": 0.759923442,
    "estado": 18.91405356,
    "country": "dk",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 251,
    "title": "ODS10",
    "progresso": 1.652783586,
    "estado": -33.89943937,
    "country": "sk",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 252,
    "title": "ODS10",
    "progresso": 3.783156941,
    "estado": -3.030581494,
    "country": "si",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 253,
    "title": "ODS10",
    "progresso": 3.52261789,
    "estado": -15.76136557,
    "country": "es",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 254,
    "title": "ODS10",
    "progresso": 0.833333333,
    "estado": -13.65882132,
    "country": "ee",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 255,
    "title": "ODS10",
    "progresso": 0.16012361,
    "estado": 25.19406757,
    "country": "fi",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 256,
    "title": "ODS10",
    "progresso": 2.344455751,
    "estado": 26.21745956,
    "country": "fr",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 257,
    "title": "ODS10",
    "progresso": 3.005412468,
    "estado": -13.55054075,
    "country": "gr",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 258,
    "title": "ODS10",
    "progresso": 0.120446563,
    "estado": -39.70523976,
    "country": "hu",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 259,
    "title": "ODS10",
    "progresso": 3.435225951,
    "estado": 35.6025463,
    "country": "ie",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 260,
    "title": "ODS10",
    "progresso": 0.115088456,
    "estado": -17.75438963,
    "country": "it",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 261,
    "title": "ODS10",
    "progresso": -0.076876292,
    "estado": -39.57262275,
    "country": "lv",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 262,
    "title": "ODS10",
    "progresso": 1.525526846,
    "estado": -18.91352351,
    "country": "lt",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 263,
    "title": "ODS10",
    "progresso": 0.794054293,
    "estado": 39.76132657,
    "country": "lu",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 264,
    "title": "ODS10",
    "progresso": 2.227400997,
    "estado": 35.35774563,
    "country": "mt",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 265,
    "title": "ODS10",
    "progresso": 0.562838721,
    "estado": 27.32843849,
    "country": "nl",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 266,
    "title": "ODS10",
    "progresso": 1.603352458,
    "estado": -20.92252112,
    "country": "pl",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 267,
    "title": "ODS10",
    "progresso": 3.446389225,
    "estado": -13.50500844,
    "country": "pt",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 268,
    "title": "ODS10",
    "progresso": 3.654460546,
    "estado": 3.628675005,
    "country": "cz",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 269,
    "title": "ODS10",
    "progresso": 2.984231341,
    "estado": -49.08512636,
    "country": "ro",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 270,
    "title": "ODS10",
    "progresso": 0.23254168,
    "estado": 16.43462982,
    "country": "se",
    "color": "#DF1382",
    "img": "data/ods10.png",
    "Descricao": "Reduzir as Desigualdades"
  },
  {
    "id": 271,
    "title": "ODS11",
    "progresso": 1.137137215,
    "estado": 4.106709284,
    "country": "de",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 272,
    "title": "ODS11",
    "progresso": 2.166435749,
    "estado": 22.83236944,
    "country": "at",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 273,
    "title": "ODS11",
    "progresso": 0.948474662,
    "estado": -8.688039981,
    "country": "be",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 274,
    "title": "ODS11",
    "progresso": 2.961276384,
    "estado": -40.68719272,
    "country": "bg",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 275,
    "title": "ODS11",
    "progresso": -0.31465535,
    "estado": -17.45037111,
    "country": "cy",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 276,
    "title": "ODS11",
    "progresso": 2.20728107,
    "estado": -16.27192436,
    "country": "hr",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 277,
    "title": "ODS11",
    "progresso": -0.15592616,
    "estado": 18.26008034,
    "country": "dk",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 278,
    "title": "ODS11",
    "progresso": 4.852323551,
    "estado": 15.16352615,
    "country": "sk",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 279,
    "title": "ODS11",
    "progresso": 3.094062975,
    "estado": 3.00031264,
    "country": "si",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 280,
    "title": "ODS11",
    "progresso": 0.8282712,
    "estado": 3.280612915,
    "country": "es",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 281,
    "title": "ODS11",
    "progresso": 2.894010638,
    "estado": 23.20292305,
    "country": "ee",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 282,
    "title": "ODS11",
    "progresso": 2.647481826,
    "estado": 33.97418038,
    "country": "fi",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 283,
    "title": "ODS11",
    "progresso": 0.999293462,
    "estado": 6.514566566,
    "country": "fr",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 284,
    "title": "ODS11",
    "progresso": -0.583446553,
    "estado": -31.87551452,
    "country": "gr",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 285,
    "title": "ODS11",
    "progresso": 3.426264358,
    "estado": 10.2026822,
    "country": "hu",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 286,
    "title": "ODS11",
    "progresso": 4.901841183,
    "estado": 35.63659731,
    "country": "ie",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 287,
    "title": "ODS11",
    "progresso": 2.184573407,
    "estado": -7.618674468,
    "country": "it",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 288,
    "title": "ODS11",
    "progresso": 3.006125,
    "estado": -6.254802295,
    "country": "lv",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 289,
    "title": "ODS11",
    "progresso": 4.6986641,
    "estado": 0.148589434,
    "country": "lt",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 290,
    "title": "ODS11",
    "progresso": 0.825040399,
    "estado": 4.571935796,
    "country": "lu",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 291,
    "title": "ODS11",
    "progresso": 0.524746436,
    "estado": -24.93148209,
    "country": "mt",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 292,
    "title": "ODS11",
    "progresso": 0.730417947,
    "estado": 2.651393978,
    "country": "nl",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 293,
    "title": "ODS11",
    "progresso": 2.443864209,
    "estado": -9.311641633,
    "country": "pl",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 294,
    "title": "ODS11",
    "progresso": 2.00432659,
    "estado": -22.00897832,
    "country": "pt",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 295,
    "title": "ODS11",
    "progresso": 3.253417518,
    "estado": 21.80418553,
    "country": "cz",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 296,
    "title": "ODS11",
    "progresso": 0.96252721,
    "estado": -38.97929647,
    "country": "ro",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 297,
    "title": "ODS11",
    "progresso": -0.272855795,
    "estado": 18.72725298,
    "country": "se",
    "color": "#F99D22",
    "img": "data/ods11.png",
    "Descricao": "Cidades e Comunidades Sustentáveis"
  },
  {
    "id": 298,
    "title": "ODS12",
    "progresso": 3.55918423,
    "estado": -18.10666654,
    "country": "de",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 299,
    "title": "ODS12",
    "progresso": 3.27422206,
    "estado": 10.64186226,
    "country": "at",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 300,
    "title": "ODS12",
    "progresso": 1.505445428,
    "estado": -17.14818968,
    "country": "be",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 301,
    "title": "ODS12",
    "progresso": 0.729607736,
    "estado": -45.65591344,
    "country": "bg",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 302,
    "title": "ODS12",
    "progresso": 2.21724098,
    "estado": -14.26873145,
    "country": "cy",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 303,
    "title": "ODS12",
    "progresso": 0.273926604,
    "estado": 13.84231458,
    "country": "hr",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 304,
    "title": "ODS12",
    "progresso": 1.7189636,
    "estado": 33.86361931,
    "country": "dk",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 305,
    "title": "ODS12",
    "progresso": 0.638783435,
    "estado": -32.22772719,
    "country": "sk",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 306,
    "title": "ODS12",
    "progresso": 2.000393578,
    "estado": -8.604517671,
    "country": "si",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 307,
    "title": "ODS12",
    "progresso": 1.517983401,
    "estado": 16.20244284,
    "country": "es",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 308,
    "title": "ODS12",
    "progresso": 3.778573142,
    "estado": -17.00054413,
    "country": "ee",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 309,
    "title": "ODS12",
    "progresso": 1.275226841,
    "estado": -13.31745607,
    "country": "fi",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 310,
    "title": "ODS12",
    "progresso": 1.868098492,
    "estado": 17.78457119,
    "country": "fr",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 311,
    "title": "ODS12",
    "progresso": 2.196487436,
    "estado": 20.5814591,
    "country": "gr",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 312,
    "title": "ODS12",
    "progresso": 4.014995451,
    "estado": -2.766997392,
    "country": "hu",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 313,
    "title": "ODS12",
    "progresso": 1.891957457,
    "estado": 17.29322477,
    "country": "ie",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 314,
    "title": "ODS12",
    "progresso": 0.313327312,
    "estado": 14.47650453,
    "country": "it",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 315,
    "title": "ODS12",
    "progresso": 1.004449356,
    "estado": -14.94062511,
    "country": "lv",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 316,
    "title": "ODS12",
    "progresso": 2.201515619,
    "estado": 4.378185987,
    "country": "lt",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 317,
    "title": "ODS12",
    "progresso": 0.325983823,
    "estado": -10.53094161,
    "country": "lu",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 318,
    "title": "ODS12",
    "progresso": 0.58287635,
    "estado": 21.63550516,
    "country": "mt",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 319,
    "title": "ODS12",
    "progresso": 3.126223687,
    "estado": 46.93625121,
    "country": "nl",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 320,
    "title": "ODS12",
    "progresso": -0.554529109,
    "estado": -19.95425798,
    "country": "pl",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 321,
    "title": "ODS12",
    "progresso": -0.576748806,
    "estado": -4.988299785,
    "country": "pt",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 322,
    "title": "ODS12",
    "progresso": 0.628362563,
    "estado": -15.86504926,
    "country": "cz",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 323,
    "title": "ODS12",
    "progresso": -0.442056314,
    "estado": 3.824005056,
    "country": "ro",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 324,
    "title": "ODS12",
    "progresso": 1.367164301,
    "estado": 13.91597133,
    "country": "se",
    "color": "#CC8B27",
    "img": "data/ods12.png",
    "Descricao": "Produção e Consumo Sustentáveis"
  },
  {
    "id": 325,
    "title": "ODS13",
    "progresso": 2.182144071,
    "estado": -28.41181437,
    "country": "de",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 326,
    "title": "ODS13",
    "progresso": 0.754510354,
    "estado": -21.92767378,
    "country": "at",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 327,
    "title": "ODS13",
    "progresso": 1.365775716,
    "estado": 10.67263517,
    "country": "be",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 328,
    "title": "ODS13",
    "progresso": 0.173881918,
    "estado": -1.978443305,
    "country": "bg",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 329,
    "title": "ODS13",
    "progresso": -2.077587876,
    "estado": -0.456589596,
    "country": "cy",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 330,
    "title": "ODS13",
    "progresso": 1.083641982,
    "estado": 10.27283734,
    "country": "hr",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 331,
    "title": "ODS13",
    "progresso": 2.168574729,
    "estado": 12.77115616,
    "country": "dk",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 332,
    "title": "ODS13",
    "progresso": 0.281720855,
    "estado": -5.842376161,
    "country": "sk",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 333,
    "title": "ODS13",
    "progresso": 2.075139899,
    "estado": -2.953297861,
    "country": "si",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 334,
    "title": "ODS13",
    "progresso": 1.242147258,
    "estado": 34.15742477,
    "country": "es",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 335,
    "title": "ODS13",
    "progresso": 1.90475503,
    "estado": -34.90108866,
    "country": "ee",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 336,
    "title": "ODS13",
    "progresso": 2.707114372,
    "estado": -20.15356522,
    "country": "fi",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 337,
    "title": "ODS13",
    "progresso": 2.736971012,
    "estado": 1.116316223,
    "country": "fr",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 338,
    "title": "ODS13",
    "progresso": 2.24045953,
    "estado": 26.65159597,
    "country": "gr",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 339,
    "title": "ODS13",
    "progresso": -0.425910408,
    "estado": 13.75173586,
    "country": "hu",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 340,
    "title": "ODS13",
    "progresso": 1.666128763,
    "estado": -9.464558506,
    "country": "ie",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 341,
    "title": "ODS13",
    "progresso": 1.398175209,
    "estado": 23.50502404,
    "country": "it",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 342,
    "title": "ODS13",
    "progresso": 0.355340177,
    "estado": 14.2879813,
    "country": "lv",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 343,
    "title": "ODS13",
    "progresso": -1.062156357,
    "estado": -7.233676849,
    "country": "lt",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 344,
    "title": "ODS13",
    "progresso": 5,
    "estado": -73.14654411,
    "country": "lu",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 345,
    "title": "ODS13",
    "progresso": 0.883405788,
    "estado": 50.91441747,
    "country": "mt",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 346,
    "title": "ODS13",
    "progresso": 2.232527573,
    "estado": -24.22245548,
    "country": "nl",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 347,
    "title": "ODS13",
    "progresso": 1.880217457,
    "estado": -21.36789891,
    "country": "pl",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 348,
    "title": "ODS13",
    "progresso": -0.699491514,
    "estado": 32.38980035,
    "country": "pt",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 349,
    "title": "ODS13",
    "progresso": 1.303909544,
    "estado": -17.25164874,
    "country": "cz",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 350,
    "title": "ODS13",
    "progresso": 0.96739345,
    "estado": 17.42055146,
    "country": "ro",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  },
  {
    "id": 351,
    "title": "ODS13",
    "progresso": 4.069972414,
    "estado": 21.40015544,
    "country": "se",
    "color": "#47773D",
    "img": "data/ods13.png",
    "Descricao": "Ação Climática"
  }
 ]