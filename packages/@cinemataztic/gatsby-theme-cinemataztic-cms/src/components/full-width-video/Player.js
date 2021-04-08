/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 07-06-2019.
 */

import React, { PureComponent } from "react";
import ReactPlayer from "react-player";
import { getImage, GatsbyImage } from "gatsby-plugin-image";

export default class Player extends PureComponent {
  state = {
    buffer: true,
    loaded: 0,
    playing: this.props.autoPlay ? true : false,
    isMuted: this.props.autoPlay ? false : true // we need to set muted = false to support auto playing in browser
  };

  bufToggle = v => {
    this.setState({ buffer: false });
  };

  isPlaying = () => {
    if (this.state.buffer) {
      this.setState({ buffer: false });
    }
  };

  onProgress = v => {
    const loaded = Math.round(v.loaded * 100);
    this.setState({ loaded: loaded });
  };

  togglePlaying = () => {
    if (!this.state.playing) {
      this.setState({ playing: !this.state.playing });
    }
  };

  closeIt = () => {
    this.setState(state => {
      state.playing = false;
      this.props.closeVideo();
    });
  };

  render() {
    const { url, showControls } = this.props;

    return (
      <div className="w-100 position-relative" style={{ userSelect: "none" }}>
        {!this.state.playing && (
          <div
            className=" position-absolute w-100 h-100 "
            style={{ zIndex: 100 }}
          >
            <>
              {this.props.coverImage && <GatsbyImage durationFadeIn={500} image={getImage(this.props.coverImage)} />}

              <div
                className="position-absolute d-flex h-100 w-100 justify-content-center align-items-center"
                style={{ top: 0, left: 0 }}
              >
                <div
                  role="button"
                  tabIndex="0"
                  onKeyPress={e => e.preventDefault()}
                  onClick={this.togglePlaying}
                  className="video-play-overlay pointer rounded-circle d-flex flex-column justify-content-center no-outline"
                  style={{ width: 100, height: 100, background: "#323232" }}
                >
                  <div className=" text-center align-items-center">PLAY</div>
                </div>
              </div>
            </>
          </div>
        )}

        <ReactPlayer
          onBuffer={() => this.bufToggle}
          onProgress={this.onProgress}
          onPlay={this.isPlaying}
          url={url}
          controls={!showControls}
          loop={true}
          className="react-player"
          playing={this.state.playing}
          muted={this.state.isMuted}
          progressInterval={500}
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}
