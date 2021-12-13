// console.log("######", clickedPoint);
const margin = { top: 20, right: 20, bottom: 180, left: 40, gap: 50 };
const csvUrl = './pair.csv';

function useData(csvPath) {
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        d3.csv(csvPath).then((data) => {
            data.forEach((d) => {
                d.Recipient_name = d.Recipient_name;
                d.number_of_interrelated_affixes = +d.number_of_interrelated_affixes;
                d.number_of_borrowed_affixes = +d.number_of_borrowed_affixes;
                d.Donor_name = d.Donor_name;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function YAxes(props) {
    const { yScale, height, text } = props;
    const ticks = yScale.ticks();
    return ( <
        g >
        <
        line y2 = { height }
        stroke = { 'white' }
        />{' '} {
            ticks.map((ticksValue) => {
                return ( <
                    g key = { ticksValue }
                    transform = { 'translate(-10,' + yScale(ticksValue) + ')' } >
                    <
                    line x2 = { 10 }
                    stroke = { 'white' }
                    />{' '} <
                    text stroke = { 'white' }
                    style = {
                        { textAnchor: 'end', fontSize: '10px', color: 'white' } } > { ticksValue } < /text>{' '} <
                    /g>
                );
            })
        } { ' ' } <
        text style = {
            { textAnchor: 'end', fontSize: '16px', color: 'white' } }
        transform = { 'translate(15,0) rotate(0)' } >
        < /text>{' '} <
        /g>
    );
}

function XAxes(props) {
    const { xScale, width, height, text } = props;
    return ( <
        g >
        <
        line x1 = { 0 }
        y1 = { height }
        x2 = { width }
        y2 = { height }
        stroke = { `white` }
        />{' '} {
            xScale &&
                xScale.ticks().map((ticksValue) => {
                    return ( <
                        g key = { ticksValue }
                        transform = { `translate(${xScale(ticksValue)}, ${height})` } >
                        <
                        line y2 = { 5 }
                        stroke = { 'white' }
                        />{' '} <
                        text stroke = { 'white' }
                        style = {
                            { textAnchor: 'middle', fontSize: '10px', color: 'white' } }
                        y = { 20 } > { ' ' } { ticksValue } { ' ' } <
                        /text>{' '} <
                        /g>
                    );
                })
        } { ' ' } <
        text style = {
            { textAnchor: 'end', fontSize: '16px', color: 'white' } }
        transform = { `translate(${width}, ${height - 10})` } >
        < /text>{' '} <
        /g>
    );
}

function BorrowedBars(props) {
    const { data, rectStep, height, y, maxY } = props;
    let width = 30;
    let bars = data.map((d, i) => {
        let h = (d.number_of_borrowed_affixes / maxY) * height;
        return ( <
            g key = { d.Donor_name } >
            <
            rect key = { d.Donor_name }
            x = { i * rectStep }
            y = { height - h }
            width = { width }
            height = { h }
            fill = { '#DFFF00' }
            stroke = { 'white' }
            strokeWidth = { '1px' } >
            < /rect>{' '} <
            text stroke = { 'white' }
            transform = { `translate(${i * rectStep + 10},${height - h - 20}) rotate(0)` }
            fontSize = { '15px' }
            style = {
                { color: 'white' } } > { ' ' } { d.number_of_borrowed_affixes } { ' ' } <
            /text>{' '}

            <
            text stroke = { 'white' }
            transform = { `translate(${i * rectStep},${220}) rotate(50)` }
            fontSize = { '15px' }
            style = {
                { color: 'white' } } > { ' ' } { d.Donor_name } { ' ' } <
            /text>{' '} <
            /g>
        );
    });
    return bars;
}

function BorrowBarChart(props) {
    const width = 500;
    const height = 600;
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const { data, maxY } = props;
    const rectStep = innerWidth / data.length;
    const xScale = null;
    const yScale = d3
        .scaleLinear()
        .range([innerHeight / 2, 0])
        .domain([0, maxY * 1.1])
        .nice();

    return ( <
        g transform = { `translate(${margin.left}, ${margin.top})` } >
        <
        text stroke = { 'white' }
        style = {
            { textAnchor: 'start', fontSize: '15px', color: 'white' } }
        transform = { `translate(${width / 10}, 0)` } >
        { ' ' } { 'Number of Borrowed Affixes' } { ' ' } <
        /text> <
        BorrowedBars data = { data }
        rectStep = { rectStep }
        height = { innerHeight / 2 }
        y = { height / 2 }
        maxY = { maxY }
        />{' '} <
        YAxes yScale = { yScale }
        height = { innerHeight / 2 }
        text = { 'number_of_borrowed_affixes' }
        />{' '} <
        XAxes xScale = { xScale }
        width = { innerWidth }
        height = { innerHeight / 2 }
        />{' '} <
        /g>
    );
}

function AsDonorBar(props) {
    const { data, rectStep, height, y, maxY } = props;
    let width = 30;
    let bars = data.map((d, i) => {
        let h = (d.number_of_borrowed_affixes / maxY) * height;

        return ( <
            g key = { d.Recipient_name } >
            <
            rect key = { d.Recipient_name }
            x = { i * rectStep }
            y = { height - h }
            width = { width }
            height = { h }
            fill = { '#FF7F50' }
            stroke = { 'white' }
            strokeWidth = { '1px' } >
            < /rect>{' '} <
            text stroke = { 'white' }
            transform = { `translate(${i * rectStep + 10},${height - h - 20}) rotate(0)` }
            fontSize = { '15px' }
            style = {
                { color: 'white' } } > { ' ' } { d.number_of_borrowed_affixes } { ' ' } <
            /text>{' '} <
            text stroke = { 'white' }
            transform = { `translate(${i * rectStep},${220}) rotate(50)` }
            fontSize = { '15px' }
            style = {
                { color: 'white' } } > { ' ' } { d.Recipient_name } { ' ' } <
            /text>{' '} <
            /g>
        );
    });
    return bars;
}

function AsDonorBarChart(props) {
    const width = 500;
    const height = 600;
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const { data, maxY, text } = props;
    const rectStep = innerWidth / data.length;
    const xScale = null;
    const yScale = d3
        .scaleLinear()
        .range([innerHeight / 2, 0])
        .domain([0, maxY * 1.1])
        .nice();

    return ( <
        g transform = { `translate(${margin.left}, ${margin.top})` } >
        <
        text stroke = { 'white' }
        style = {
            { textAnchor: 'start', fontSize: '15px' } }
        transform = { `translate(${width / 10}, 0)` } >
        { ' ' } { 'Number of Donating Affixes' + text } { '' } <
        /text> <
        AsDonorBar data = { data }
        rectStep = { rectStep }
        height = { innerHeight / 2 }
        y = { height / 2 }
        maxY = { maxY }
        />{' '} <
        YAxes yScale = { yScale }
        height = { innerHeight / 2 }
        text = { '0' }
        />{' '} <
        XAxes xScale = { xScale }
        width = { innerWidth }
        height = { innerHeight / 2 }
        />{' '} <
        /g>
    );
}

const Charts = () => {
    const dataAll = useData(csvUrl);
    // const [selectedName, setSelectedName] = React.useState("Indonesian");
    // const data1 = dataAll.filter
    const [data1, setData1] = React.useState([]);
    const [data2, setData2] = React.useState([]);
    var selectedName = '';
    // var selectedName = 'Indonesian';

    React.useEffect(() => {
        if (!dataAll) {
            return;
        }
        setData1(dataAll.filter((d) => d.Recipient_name === selectedName));
        setData2(dataAll.filter((d) => d.Donor_name === selectedName));
    }, [dataAll]);

    if (!dataAll) {
        return <pre > Loading... < /pre>;
    }
    window.test = (data) => {
        changeData(data);
    };

    const Recipient_nameSet = new Set();
    dataAll.forEach((d) => {
        Recipient_nameSet.add(d.Recipient_name);
    });
    const Recipient_names = Array.from(Recipient_nameSet);
    const maxY1 = d3.max(dataAll, (d) => d.number_of_borrowed_affixes);

    const Donor_nameSet = new Set();
    dataAll.forEach((d) => {
        Donor_nameSet.add(d.Donor_name);
    });
    const Donor_names = Array.from(Donor_nameSet);
    const maxY2 = d3.max(dataAll, (d) => d.number_of_borrowed_affixes);

    const WIDTH = 500;
    const HEIGHT = 500;
    const innerHeight = HEIGHT - margin.top - margin.bottom;
    const innerWidth = WIDTH - margin.left - margin.right;
    // console.log(data1);
    // console.log(data2);

    function changeData(node) {
        selectedName = node;
        setData1(
            dataAll.filter((d) => {
                return d.Recipient_name === selectedName;
            })
        );

        setData2(
            dataAll.filter((d) => {
                return d.Donor_name === selectedName;
            })
        );
    }

    return ( <
        div >
        <
        svg id = "chart1"
        width = { WIDTH }
        height = { HEIGHT } >
        <
        BorrowBarChart data = { data1 }
        maxY = { maxY1 }
        />{' '} <
        /svg>{' '} <
        svg id = "chart2"
        width = { WIDTH }
        height = { HEIGHT } >
        <
        AsDonorBarChart data = { data2 }
        maxY = { maxY2 }
        text = { selectedName }
        />{' '} <
        /svg>{' '} <
        /div>
    );
};
const rootElement = document.getElementById('root');
ReactDOM.render( < Charts / > , rootElement);