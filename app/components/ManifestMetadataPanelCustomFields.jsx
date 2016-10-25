var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var MetadataFieldDialog = require('MetadataFieldDialog');

var ManifestMetadataPanelCustomFields = React.createClass({
  getInitialState: function() {
    return {
      selectedMetadataFieldToViewJson: {
        label: undefined,
        value: undefined
      },
      activeMetadataFields: []
    }
  },
  componentWillMount: function() {
    // initialize the active metadata field list with the fields defined in the manifest
    this.setState({
      activeMetadataFields: this.props.manifestData.metadata
    });
  },
  addMetadataField: function(metadataFieldLabel, metadataFieldValue) {
    // create a copy of the active metadata field list
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // append the metadata field to the list of active metadata fields in the state
    activeMetadataFields.push({ label: metadataFieldLabel, value: metadataFieldValue });

    // update the active metadata field list in the state so that the component uses the correct values when rendering
    this.setState({
      activeMetadataFields: activeMetadataFields
    });
  },
  updateMetadataFieldName: function(fieldValue, path, fieldName) {
    // TODO: update the metadata field name for the manifest data object in the store
  },
  updateMetadataFieldValue: function(fieldValue, path, fieldName) {
    // TODO: update the metadata field value for the manifest data object in the store
  },
  deleteMetadataField: function(fieldIndex) {
    // create a copy of the active metadata field list
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // delete the metadata field from the list of active fields
    activeMetadataFields.splice(fieldIndex, 1);

    // update the active metadata field list in the state so that the component uses the correct values when rendering
    this.setState({
      activeMetadataFields: activeMetadataFields
    });

    // delete the custom metadata field from the manifest data object in the store
    this.props.dispatch(actions.deleteCustomMetadataFieldAtIndex(fieldIndex));
  },
  viewJsonMetadata: function(metadataFieldLabel, metadataFieldValue) {
    // set the selected metadata field in the state to display the metadata field dialog with the correct data
    this.setState({
      selectedMetadataFieldToViewJson: {
        label: metadataFieldLabel,
        value: metadataFieldValue
      }
    });

    // open the metadata field dialog
    var $metadataFieldDialog = $(ReactDOM.findDOMNode(this.refs.metadataFieldDialog));
    $metadataFieldDialog.modal({
      backdrop: 'static'
    });
  },
  render: function() {
    var _this = this;
    return (
      <div>
        <MetadataFieldDialog ref="metadataFieldDialog" metadataField={this.state.selectedMetadataFieldToViewJson} />
        {
          Object.keys(this.state.activeMetadataFields).map(function(fieldIndex) {
            var metadataField = _this.state.activeMetadataFields[fieldIndex];
            return (
              <dl key={fieldIndex}>
                {(() => {
                  if(metadataField.label === undefined) {
                    return (
                      <dt className="metadata-field-label">
                        <EditableTextArea fieldName={metadataField.label} fieldValue={metadataField.value.toString()} path="" onUpdateHandler={_this.updateMetadataFieldName}/>
                      </dt>
                    );
                  } else {
                    return (
                      <dt className="metadata-field-label">
                        {metadataField.label}
                      </dt>
                    );
                  }
                })()}
                {(() => {
                  if(metadataField.value === undefined) {
                    return (
                      <dd className="metadata-field-value">N/A</dd>
                    );
                  } else {
                    return (
                      <dd className="metadata-field-value">
                        {(() => {
                          if(typeof metadataField.value === 'string' || metadataField.value instanceof String) {
                            return (
                              <EditableTextArea fieldName={metadataField.label} fieldValue={metadataField.value.toString()} path="" onUpdateHandler={_this.updateMetadataFieldValue}/>
                            );
                          } else {
                            return (
                              <span><a href="javascript:;" title="View JSON metadata" onClick={() => _this.viewJsonMetadata(metadataField.label, JSON.stringify(metadataField.value, null, 2))}>View JSON metadata</a></span>
                            );
                          }
                        })()}                    
                      </dd>
                    );
                  }
                })()}                    
                {(() => {
                  return (
                    <dd className="metadata-field-delete">
                      <a href="javascript:;" title={"Delete " + metadataField.label + " field"} onClick={() => _this.deleteMetadataField(fieldIndex)}>
                        <span className="fa fa-times-circle"></span>
                      </a>
                    </dd>
                  );
                })()}
              </dl>
            );
          })
        }
        <button type="button" className="btn btn-default add-metadata-field-button" title="Add metadata field" onClick={() => _this.addMetadataField(undefined, "N/A")}>
          <span className="fa fa-plus"></span> Add metadata field
        </button>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestData: state.manifestReducer.manifestData
    };
  }
)(ManifestMetadataPanelCustomFields);