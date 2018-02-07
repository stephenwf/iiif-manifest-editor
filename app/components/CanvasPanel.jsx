import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import EditableTextArea from './EditableTextArea';
import NavigationArrow from './NavigationArrow';
import Utils from '../libraries/Utils';
import OnScreenHelp from './OnScreenHelp';
import {
  CanvasProvider,
  CanvasNavigation,
  LocaleString,
  SingleTileSource,
  OpenSeadragonViewport,
  SizedViewport,
  Manifest,
} from '@canvas-panel/core';

class CanvasPanel extends Component {
  render() {
    const { manifestoObject: manifest } = this.props;
    if (!manifest) {
      return <div />;
    }

    const canvas = manifest
      .getSequenceByIndex(0)
      .getCanvasById(this.props.selectedCanvasId);

    return (
      <div className="viewer-container" tabIndex="0">
        <SingleTileSource
          manifest={manifest}
          canvas={canvas}
          height={canvas.getHeight()}
          width={canvas.getWidth()}
        >
          <SizedViewport style={{ width: '100%', height: '75vh' }}>
            <OpenSeadragonViewport viewportController={true} />
          </SizedViewport>
        </SingleTileSource>
      </div>
    );
  }
}

module.exports = connect(state => {
  return {
    manifestoObject: state.manifestReducer.manifestoObject,
    selectedCanvasId: state.manifestReducer.selectedCanvasId,
    showMetadataSidebar: state.manifestReducer.showMetadataSidebar,
  };
})(CanvasPanel);
