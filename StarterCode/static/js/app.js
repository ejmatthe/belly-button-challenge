// Set url variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Build initialize function and initialize
function init () {
    let dropdownMenu = d3.select("#selDataset");
    // Find sample names to create the dropdown options
    d3.json(url).then(function(data) {
        let sampleNames = data.names;
        sampleNames.forEach((sample) => {
              dropdownMenu.append("option") 
               .text(sample)
               .property("value", sample);
        });
    // Build initial plot
    let initSample = sampleNames[0];
    drawPlot(initSample);
    bubblePlot(initSample);
    showMetadata(initSample);
    });
};
init();

// Definie optionChanged function from index.html
function optionChanged(newSample) {
    drawPlot(newSample);
    bubblePlot(newSample);
    showMetadata(newSample);
};


// Make the plot, as a function to call for dropdown changes
function drawPlot(sample) {
    d3.json(url).then(function(data) {
        // Create variable and store the samples array from the jsonified data
        let samplesArray = data.samples;
        console.log(samplesArray);
        // Create variable that pulls only data for matching sample and find first index
        let filteredSamples = samplesArray.filter(sampleId => sampleId.id == sample);
        let sampleData = filteredSamples[0];
        // Log into console for verification
        console.log(filteredSamples, sampleData);
        // Create variables for sample_values, otu_ids, otu_labels
        let sample_values = sampleData.sample_values;
        let otu_ids = sampleData.otu_ids;
        let otu_labels = sampleData.otu_labels;
        // Log into console for verification
        console.log(sample_values, otu_ids, otu_labels);
        // Set the values for the plot, in descending order for the vertical bar chart
        let xticks = sample_values.slice(0,10).reverse();
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        // Set up trace and layout, and draw plot
        let trace = [{
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        }];
        let layout = {
            title: "Top 10 OTU Samples"
        };
        Plotly.newPlot("bar", trace, layout);
    });
};



// Make bubble plot

function bubblePlot(sample) { 
    d3.json(url).then(function(data) {
        // Create variable and store the samples array from the jsonified data
        let samplesArray = data.samples;
        console.log(samplesArray);
        // Create variable that pulls only data for matching sample and find first index
        let filteredSamples = samplesArray.filter(sampleId => sampleId.id == sample);
        let sampleData = filteredSamples[0];
         // Create variables for sample_values, otu_ids, otu_labels
         let sample_values = sampleData.sample_values;
         let otu_ids = sampleData.otu_ids;
         let otu_labels = sampleData.otu_labels;
         // Set up trace and layout, and draw plot
         let traceBubble = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
            }
         }];

         let layoutBubble = {
            title: "Bacteria per Sample",
            showleegend: false
         };

         Plotly.newPlot("bubble", traceBubble, layoutBubble);
        }
    )};

    // Build a function to find, store and display the metadata
    function showMetadata(sample) { 
        d3.json(url).then(function(data) {        
        let metadataArray = data.metadata;
        // Create variable that pulls only data for matching sample and find first index
        let filteredMetadata = metadataArray.filter(sampleId => sampleId.id == sample);
        let sampleMetadata = filteredMetadata[0];
        // Use D3 to find metadata panel in HTML, clear existing data and print new data
        let metadataPanel = d3.select("#sample-metadata").html("");
        Object.entries(sampleMetadata).forEach(([key, value]) =>
            // Append to the metadata panel
            metadataPanel.append("h5").text(`${key}: ${value}`)
        )}
    )};