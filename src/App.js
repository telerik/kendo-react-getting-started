import React, { Component } from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import categories from './categories.json';
import products from './products.json';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Window } from '@progress/kendo-react-dialogs';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dropdownlistCategory: null,
      windowVisible: false,
      gridClickedRow: {},
      gridDataState: {
        sort: [
          { field: "ProductName", dir: "asc" }
        ],
        page: { skip: 0, take: 10 }
      }
    }
  }
  
  handleDropDownChange = (e) => {
    this.setState({
      dropdownlistCategory: e.target.value.CategoryID
    });
  }
  
  handleGridDataStateChange = (e) => {
    this.setState({gridDataState: e.data});
  }
  
  handleGridRowClick = (e) => {
    this.setState({
        windowVisible: true,
        gridClickedRow: e.dataItem
    });
  }
  
  closeWindow = (e) => {
    this.setState({
        windowVisible: false
    });
  }
  
  render() {
    return (
      <div id="kendoreact-getting-started">
        <h1>KendoReact Getting Started</h1>
        <ul>
          <li>Select an item from the <strong>DropDownList</strong> to see its ID.</li>
          <li>Click on a <strong>Grid</strong> row to see product details in a popup <strong>Window</strong>.</li>
        </ul>
        <p>
          <DropDownList
            data={categories}
            dataItemKey="CategoryID"
            textField="CategoryName"
            defaultItem={{CategoryID: null, CategoryName: "Product categories"}}
            onChange={this.handleDropDownChange}
            />
          &nbsp; Selected category ID: <strong>{this.state.dropdownlistCategory}</strong>
        </p>
        
        {this.state.windowVisible &&
          <Window
            title="Product Details"
            onClose={this.closeWindow}
            height={250}>
            <dl>
              <dt>Product Name</dt>
              <dd>{this.state.gridClickedRow.ProductName}</dd>
              <dt>Product ID</dt>
              <dd>{this.state.gridClickedRow.ProductID}</dd>
              <dt>Quantity per Unit</dt>
              <dd>{this.state.gridClickedRow.QuantityPerUnit}</dd>
            </dl>
          </Window>
        }
        
        <Grid
          data={process(products, this.state.gridDataState)}
          pageable={true}
          sortable={true}
          {...this.state.gridDataState}
          onDataStateChange={this.handleGridDataStateChange}
          onRowClick={this.handleGridRowClick}
          style={{ height: "400px" }}>
          <GridColumn field="ProductName" title="Product Name" />
          <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
          <GridColumn field="UnitsInStock" title="Units in Stock" />
          <GridColumn field="Discontinued" filter="boolean" cell={checkboxColumn} />
        </Grid>
      </div>
    );
  }
}

class checkboxColumn extends Component {
  render() {
    return (
        <td>
          <input type="checkbox" checked={this.props.dataItem[this.props.field]} disabled="disabled" />
        </td>
    );
  }
}

export default App;