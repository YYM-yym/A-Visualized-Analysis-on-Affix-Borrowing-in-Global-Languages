window.test2 = function() {
    d3.csv('./pair.csv').then(function(data) {
        var PieReceiveName1;
        var PieReceiveName2;

        PieReceiveName1 = window.PieReceiveName1;
        PieReceiveName2 = window.PieReceiveName2;
        debugger;
        var dataToDraw;

        function getData() {
            data.forEach((d) => {
                d.Recipient_name = d.Recipient_name;
                d.Donor_name = d.Donor_name;
                d.Adjectivizer_or_Adverbializer = +d.Adjectivizer_or_Adverbializer;
                d.Particle = +d.Particle;
                d.Case_Suffixes = +d.Case_Suffixes;
                d.Noun = +d.Noun;
                d.Nominalizer = +d.Nominalizer;
                d.Number_and_Numeral_Representations = +d.Number_and_Numeral_Representations;
                d.Valency_Changing_Verbal_Suffixes = +d.Valency_Changing_Verbal_Suffixes;
                d.Verb = +d.Verb;
            });

            var dataOneLine = data
                .filter((d) => d.Recipient_name === PieReceiveName1 && d.Donor_name === PieReceiveName2)
                .map((d) => [
                    d.Adjectivizer_or_Adverbializer,
                    d.Particle,
                    d.Case_Suffixes,
                    d.Noun,
                    d.Nominalizer,
                    d.Number_and_Numeral_Representations,
                    d.Valency_Changing_Verbal_Suffixes,
                    d.Verb,
                ]);

            dataToDraw = dataOneLine[0];
        }

        var svg = d3.select('#chartx'),
            width = svg.attr('width'),
            height = svg.attr('height'),
            radius = Math.min(width, height) / 2,
            g = svg.append('g').attr('transform', 'translate(' + width / 3 + ',' + height / 2 + ')');

        var color = d3.scaleOrdinal([
            '#ca6f1e',
            '#f9e79f',
            '#f6ddcc',
            '#FFBF00',
            '#873600',
            '#CD5C5C',
            '#eb984e',
            '#d98880',
            '#DE3163',
        ]);

        var circle = svg
            .append('circle')
            .attr('transform', `translate(${width / 3 - 50}, 10)`)
            .attr('cx', 200)
            .attr('cy', 20)
            .attr('r', 6)
            .style('fill', color(0));

        var text = svg
            .append('text')
            .attr('x', 250)
            .attr('y', 20)
            .style('fill', 'white')
            .attr('transform', `translate(${width / 3 - 80}, 10)`)
            .text('Adjectivizer_or_Adverbializer')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        var circle = svg
            .append('circle')
            .attr('transform', `translate(${width / 3 - 50}, 30)`)
            .attr('cx', 200)
            .attr('cy', 20)
            .attr('r', 6)
            .style('fill', color(1));

        var text = svg
            .append('text')
            .attr('x', 250)
            .attr('y', 20)
            .attr('transform', `translate(${width / 3 - 80}, 30)`)
            .text('Particle')
            .style('font-size', '15px')
            .style('fill', 'white')
            .attr('alignment-baseline', 'middle');


        var circle = svg
            .append('circle')
            .attr('transform', `translate(${width / 3 - 50}, 50)`)
            .attr('cx', 200)
            .attr('cy', 20)
            .attr('r', 6)
            .style('fill', color(2));

        var text = svg
            .append('text')
            .attr('x', 250)
            .attr('y', 20)
            .attr('transform', `translate(${width / 3 - 80}, 50)`)
            .text('Case_Suffixes')
            .style('font-size', '15px')
            .style('fill', 'white')
            .attr('alignment-baseline', 'middle');

        var circle = svg
            .append('circle')
            .attr('transform', `translate(${width / 3 - 50}, 70)`)
            .attr('cx', 200)
            .attr('cy', 20)
            .attr('r', 6)
            .style('fill', color(3));

        var text = svg
            .append('text')
            .attr('x', 250)
            .attr('y', 20)
            .attr('transform', `translate(${width / 3 - 80}, 70)`)
            .text('Noun')
            .style('font-size', '15px')
            .style('fill', 'white')
            .attr('alignment-baseline', 'middle');

        var circle = svg
            .append('circle')
            .attr('transform', `translate(${width / 3 - 50}, 90)`)
            .attr('cx', 200)
            .attr('cy', 20)
            .attr('r', 6)
            .style('fill', color(4));

        var text = svg
            .append('text')
            .attr('x', 250)
            .attr('y', 20)
            .attr('transform', `translate(${width / 3 - 80}, 90)`)
            .text('Nominalizer')
            .style('font-size', '15px')
            .style('fill', 'white')
            .attr('alignment-baseline', 'middle');

        var circle = svg
            .append('circle')
            .attr('transform', `translate(${width / 3 - 50}, 110)`)
            .attr('cx', 200)
            .attr('cy', 20)
            .attr('r', 6)
            .style('fill', color(5));

        var text = svg
            .append('text')
            .attr('x', 250)
            .attr('y', 20)
            .attr('transform', `translate(${width / 3 - 80}, 110)`)
            .text('Number_and_Numeral_Representations')
            .style('font-size', '15px')
            .style('fill', 'white')
            .attr('alignment-baseline', 'middle');

        var circle = svg
            .append('circle')
            .attr('transform', `translate(${width / 3 - 50}, 130)`)
            .attr('cx', 200)
            .attr('cy', 20)
            .attr('r', 6)
            .style('fill', color(6));

        var text = svg
            .append('text')
            .attr('x', 250)
            .attr('y', 20)
            .attr('transform', `translate(${width / 3 - 80}, 130)`)
            .text('Valency_Changing_Verbal_Suffixes')
            .style('font-size', '15px')
            .style('fill', 'white')
            .attr('alignment-baseline', 'middle');

        var circle = svg
            .append('circle')
            .attr('transform', `translate(${width / 3 - 50}, 150)`)
            .attr('cx', 200)
            .attr('cy', 20)
            .attr('r', 6)
            .style('fill', color(7));

        var text = svg
            .append('text')
            .attr('x', 250)
            .attr('y', 20)
            .attr('transform', `translate(${width / 3 - 80}, 150)`)
            .text('Verb')
            .style('font-size', '15px')
            .style('fill', 'white')
            .attr('alignment-baseline', 'middle');

        getData();
        drawPie(dataToDraw);

        function mouseClick() {
            // PieReceiveName1 = PieSentName1;
            // PieReceiveName2 = PieSentName2;
            getData();

            console.log('CLICKED');
            d3.select('arc').html('');

            drawPie(dataToDraw);
        }

        // console.log(dataToDraw);

        var tooltip = d3.select('#chartx')
            .append('div')
            .attr('class', 'pietooltip');

        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'count');

        tooltip.append('div')
            .attr('class', 'percent');

        // d3.csv('./pair.csv', function (error, dataset) {
        //   dataset.forEach(function (d) {
        //   });

        var path = svg.selectAll('path')
            // .data(drawPie(dataOneLine))
            .enter()
            .append('path')
            // .attr('d', arc)
            //     .attr('fill', function (d, i) {
            //       return color(d.data.label);
            //     });

        path.on('mouseover', function(d) {
            // var total = d3.sum(dataset.map(function (d) {
            //   return d.count;
            // }));
            // var percent = Math.round(1000 * d.data.count / total) / 10;
            // tooltip.select('.label').html(d.data.label);
            // tooltip.select('.count').html(d.data.count);
            // tooltip.select('.percent').html(percent + '%');
            tooltip.style('display', 'block');
        });

        path.on('mouseout', function() {
            tooltip.style('display', 'none');
        });
        // });


        function drawPie(da) {
            // Generate the pie
            var pie = d3.pie();

            // Generate the arcs
            var arc = d3.arc().innerRadius(0).outerRadius(radius);

            //Generate groups
            var arcs = g
                .selectAll('arc')
                .data(pie(da))
                .enter()
                .append('g')
                .attr('class', 'arc')
                .attr('stroke', 'white')

            //Draw arc paths
            arcs
                .append('path')
                .attr('fill', function(d, i) {
                    return color(i);
                })
                .attr('d', arc);

            arcs.append("text")
                .attr("fill", "white")
                .attr("transform", function(da) {
                    return "translate(" + arc.centroid(da) + ")";
                })
                .attr("text-anchor", "middle")
                .text(function(da) {
                    return da.value;
                });
        }
    });
};