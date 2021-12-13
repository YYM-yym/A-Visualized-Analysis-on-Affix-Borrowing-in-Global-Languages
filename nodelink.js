// console.log(legend);
const csvUrlnode = './rawData.csv';

function useData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  window.test3 = (type) => {
    d3.csv(csvPath).then((data) => {
      data.forEach((d) => {
        d.Affix_num = +d.Affix_num;
        d.Population = +d.Population;
        d.Count = +d.Count;
      });
      if (type !== 'all') {
        let data3 = [];
        let data1 = data.filter((item) => item.Macroarea == type);

        data1.map((item2) => {
          data.map((item1) => {
            if (item2.Donor_index == item1.Language_index) {
              data3.push(item1);
            }
          });
        });
        let a = [];
        if (type == 'Australia & New Guinea') {
          a = data.filter((item) => item.Language_index == '1098.0' || '1105');
        }
        data = [...data1, ...data3, ...a];
      }
      setData(data);
    });
  };
  React.useEffect(() => {
    window.test3('all');
  }, []);
  return dataAll;
}

function NodeInGraph(props) {
  const { node, radius, color } = props;
  return (
    <circle
      key={node.id}
      cx={node.x}
      cy={node.y}
      r={radius}
      fill={color}
      name={node.name}
      pop={node.pop}
    ></circle>
  );
}

function Link(props) {
  const { link, lineWidth } = props;
  return (
    <line
      key={link.index}
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      stroke={'white'}
      strokeWidth={lineWidth}
      name={link.source.name}
      name2={link.target.name}
      anum={link.affixNum}
    ></line>
  );
}

function Graph(props) {
  const { x, y, width, height, data } = props;
  const d3Selection = React.useRef();

  // let nodes = d3.groups(data, d=>d["Language_index"])
  //     .map(d=>{return {id:d[0], name:d[1][0]["Language"], pop:d[1][0]["Population"], value:d[1][0]["Count"]}});
  // console.log("nodes", nodes);
  // let nodes = data.map(d=>{return {id:d["Language_index"], name:d["Language"], pop:d["Population"], value:d["Count"]}});
  let nodes = d3
    .groups(data, (d) => d['Language_index'])
    .map((d) => {
      return {
        id: d[0],
        name: d[1][0]['Language'],
        pop: d[1][0]['Population'],
        value: d[1][0]['Count'],
      };
    });
  console.log(nodes);
  let links = [];
  data.forEach((d) => {
    if (d['Language_index'] && d['Donor_index']) {
      links.push({
        source: d['Language_index'],
        target: d['Donor_index'],
        affixNum: d['Affix_num'],
        value: 1,
      });
    }
  });
  //console.log(links);

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(links).id((d) => d.id)
    ) //currently use the default distance; you may set the distance manually
    //.force("link", d3.forceLink(links).id(d=>d.id).distance(d=>100/d.value))
    .force('charge', d3.forceManyBody())
    .force('x', d3.forceX([width / 2]).strength(0.06)) //forceX and forceY are added to drag the nodes to the graph center
    .force('y', d3.forceY([height / 2]).strength(0.06))
    .force('centrer', d3.forceCenter(width / 2, height / 2))
    .tick(1000);

  const lineWidth = d3
    .scaleLinear()
    .range([2, 10])
    .domain([d3.min(links, (d) => d.affixNum), d3.max(links, (d) => d.affixNum)]);
  const radius = d3
    .scaleLinear()
    .range([5, 15])
    .domain([d3.min(nodes, (d) => d.value), d3.max(nodes, (d) => d.value)]);
  const color = (pop) => {
    if (pop == 0) {
      return '#bcbcbc';
    } else if (pop < 10000) {
      return '#bcbcbc';
    } else if (pop < 1000000) {
      return '#fe9b56';
    } else {
      return '#c45000';
    }
  };

  // console.log(radius.domain());
  return (
    <g transform={`translate(${x}, ${y})`}>
      {' '}
      {links.map((d, idx) => (
        <Link key={idx} link={d} lineWidth={lineWidth(d.affixNum)} />
      ))}{' '}
      {nodes.map((d, idx) => (
        <NodeInGraph key={idx} node={d} radius={radius(d.value)} color={color(d.pop)} />
      ))}{' '}
    </g>
  );
}

const App = () => {
  const WIDTH = 800;
  const HEIGHT = 600;
  const margin = { top: 100, right: 50, bottom: 50, left: 40 };
  const width = WIDTH - margin.left - margin.right;
  const height = HEIGHT - margin.top - margin.bottom;
  const rawData = useData(csvUrlnode);

  if (!rawData) {
    return <p> Loading... </p>;
  }

  // console.log(rawData);
  return (
    <svg width={WIDTH} height={HEIGHT}>
      <Graph x={margin.left} y={margin.right} width={width} height={height} data={rawData} />{' '}
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById('rootnode'));

// mouseenter的委托，一般不用mouseon
$('html').delegate('line', 'mouseenter', function() {
  var language1 = $(this).attr('name');
  var language2 = $(this).attr('name2');
  var anum = $(this).attr('anum');
  var _x = $(this).attr('x1');
  var _y = $(this).attr('y1');
  btnclick(language1, language2, anum, _x, _y);
});
$('html').delegate('circle', 'mouseenter', function() {
  var name = $(this).attr('name');
  var pop = $(this).attr('pop');
  var _x = $(this).attr('cx');
  var _y = $(this).attr('cy');
  btnclick2(name, pop, _x, _y);
});
// mouseleave的委托
$('html').delegate('line', 'mouseleave', function() {
  $('.tooltip').removeClass('show');
});
$('html').delegate('circle', 'mouseleave', function() {
  $('.tooltip').removeClass('show');
});

function btnclick(a, b, c, d, e) {
  $('.tooltip').html('Donor: ' + b + ', Recipient: ' + a + ', Affix num: ' + c);
  $('.tooltip').css({ left: d + 1 + 'px', top: e + 1 + 'px' });
  $('.tooltip').addClass('show');
}

function btnclick2(a, b, c, d) {
  $('.tooltip').html(a + ', Population: ' + b);
  $('.tooltip').css({ left: c + 20 + 'px', top: d + 20 + 'px' });
  $('.tooltip').addClass('show');
}
// click的委托
$('html').delegate('line', 'click', function(event) {
  var language1 = $(this).attr('name');
  var language2 = $(this).attr('name2');
  console.log('donor:', language1);
  console.log('recipient:', language2);
  window.test(language1);
  window.test(language2);
  window.PieReceiveName1 = language1;
  window.PieReceiveName2 = language2;
  window.test2();
  console.log('line click');
});
$('html').delegate('circle', 'click', function(event) {
  var selectedName = $(this).attr('name');
  console.log(selectedName);
  window.test(selectedName);

  var big = $(this).attr('r');
  var color = $(this).attr('fill');

  $(this).attr('r', 10);
  $(this).attr('fill', '#DFFF00');
  setTimeout(() => {
    $(this).attr('r', big);
    $(this).attr('fill', color);
  }, 3000);

  // console.log(event.currentTarget.circle);
});
