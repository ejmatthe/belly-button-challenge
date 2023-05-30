# belly-button-challenge

This project involved creating a JavaScript file that uses the D3 library to read in a JSON file, and then use that data to create a bar chart, a bubble chart, and display the sample's metadata (demographic information) in a panel. After some minor exploration of the data, it became clear that the subsets of "samples" and "metadata" would be used (for the plots and metadata panel, respectively). The advanced challenge assignment for the washing frequency is not included, and the line referencing it was removed from the HTML file.

## The Bar Chart
The bar chart was designed to be horizontal, descending in order down the plot. The fields "sample_values", "otu_ids" and "otu_labels" were used for the bar values, bar labels and hovertext, respectively. As the number of microbial species in samples could vary, and sometimes to a large degree, the chart displays only the top 10 values.

## The Bubble Plot
The bubble plot instead shows all of the microbial species observed in the sample, with the bubble/marker size based on the "sample_values", as are the values on the y-axis. The x-axis, and marker color, is based on "otu_ids", and "otu_labels" is used for the text values.

## The Metadata Panel
The metadata panel is based on the list of dictionaries identified in the JSON as "metadata". It starts by finding the object "panel" in the HTML file with D3, and clearing any data present. It then appends the metadata key-value pairs to the panel in a reasonable font size.

## Final steps
Once the plots and metadata panel were finished, there were 2 final steps. First, I had to define a function "init" to populate the plots and panel when first loading (both to make the website feel more "alive" and to make sure everything worked properly). This function was designed to populate the samples in the dropdown menu (so we can select which samples to use) and then use the first sample to draw the two plots and fill in the metadata panel. 

Then, there needed to be a function to repopulate the plots and panel when changing the selection on the dropdown menu. Some of thise was provided and accounted for in the HTML file, including the function name "optionChanged". Once it is processed, by changing the dropdown selection, the function re-runs the bar chart, bubble plot and metadata panel functions for the new sample selection.
