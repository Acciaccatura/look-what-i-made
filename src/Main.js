import React, { Component } from 'react';
import './Main.css';

// TODO: convert gallery to objects with names, widths, and heights
const gallery = [
  {
		url:"acciaccatura2.png",
		width:256,
		height:256
	},
  {
		url:"akua.png",
		width:3200,
		height:3200
	},
  {
		url:"mei.png",
		width:293,
		height:311
	},
  {
		url:"nier_atmt_2b_sideb.png",
		width:3300,
		height:2550
	},
  {
		url:"noelle_n_diya.png",
		width:3300,
		height:2550
	},
  {
		url:"overwatch_alternative_cover.png",
		width:1600,
		height:2560
	},
  {
		url:"pikasquirt.png",
		width:1200,
		height:720
	}
]

class NavBar extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (<div id="navbar">{"William C"}</div>);
  }
}


class Image extends Component {
  constructor(props) {
    super();
  }

  generateInstagramLink() {
    if (this.props.instagram) {
      return (
        <div className="instagram-url artist-info-lower">
          <span className="info-text"><img className="logo" alt="instagram" src="instagram.png" /></span>
          <span className="info-text">{this.props.instagram}</span>
        </div>);
    }
  }

  generateTwitterLink() {
    if (this.props.twitter) {
      return (
        <div className="twitter-url artist-info-lower">
          <span className="info-text"><img className="logo" alt="twitter" src="twitter.png" /></span>
          <span className="info-text">{this.props.twitter}</span>
        </div>);
    }
  }

  render() {
    return (
      <div className="image" style={{
        backgroundImage: `url(${this.props.imageUrl})`,
        width: this.props.width,
        height: this.props.height
      }}>
        <div className="artist">
          <div className="artist-name">{ this.props.artist_name }</div>
          <div className="discord-user artist-info">
            <span className="info-text"><img className="logo" alt="discord" src="discord.png" /></span>
            <span className="info-text">{this.props.discord}</span>
          </div>
          { this.generateTwitterLink() }
          { this.generateInstagramLink() }
        </div>
      </div>
    );
  }
}

class Main extends Component {

  constructor(props) {
    super();
    this.state = {
      width: 1440,
      images: []
    };
    this.maxImageHeight = 512;
    this.minImageHeight = 200;
    this.maxRowWidth = 1280;
  }
  
  componentDidMount() {
    // window.addEventListener('scroll', this.scrolled());
    this.getImages(0);
  }

  /*
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrolled());
  }


  scrolled() {

  }
  */

  async getImages(limit) {
    let images = []
    for (let index = 0; index < gallery.length; index++) {
      images.push({
        url: 'art/' + gallery[index].name,
        width: gallery[index].width,
        height: gallery[index].height
      });
    }
    let newImages = this.organizeImages(images);
    this.setState((state, props) => {
      return {
        images: newImages
      };
    }, () => {
      console.log('Updated!');
    });
  }
  }

  organizeImages(apiImages) {
    var images = [];
    let currWidth = 0;
    let prevIndex = 0;
    let currHeight = this.maxImageHeight;
    for (let index = 0; index < apiImages.length; index++) {
      let image = apiImages[index];
      let newCurrWidth = currWidth;
      let newCurrHeight = currHeight;
      let imageWidth = image.width, imageHeight = image.height;
      if (imageWidth / imageHeight > 2.5) {
        images.push({
          imageUrl: image.url,
          width: this.maxRowWidth.toString() + "px",
          height: Math.round(imageHeight * this.maxRowWidth / imageWidth).toString() + "px"
        });
        apiImages.splice(index, 1);
        index--;
        continue;
      }
      if (imageHeight < currHeight) {
        if (imageHeight < this.minImageHeight) {
          imageHeight = this.minImageHeight;
        }
        newCurrHeight = imageHeight;
        newCurrWidth = currWidth * newCurrHeight / currHeight;
      } else {
        imageWidth = imageWidth * currHeight / imageHeight;
        imageHeight = currHeight;
      }
      newCurrWidth += imageWidth;
      console.log("Width: " + image.width +
                  "\nHeight: " + image.height + 
                  "\nNew Width: " + imageWidth +
                  "\nNew Height: " + imageHeight +
                  "\nCurrent Window: " + newCurrWidth);
      if (newCurrWidth > this.maxRowWidth | index === apiImages.length - 1) {
        // scale up old width
        newCurrHeight = (newCurrHeight * this.maxRowWidth) / newCurrWidth;
        let finalHeight = Math.round(newCurrHeight);
        let finalCurrWidth = 0;
        for (let index2 = prevIndex; index2 <= index; index2++) {
          let prevImage = apiImages[index2];
          let finalWidth = Math.round(prevImage.width * newCurrHeight / prevImage.height);
          if (index2 === index) {
            finalWidth = this.maxRowWidth - finalCurrWidth;
          } else {
            finalCurrWidth += finalWidth;
          }
          console.log("Final Width: " + finalWidth + 
                      "\nFinal Height: " + finalHeight);
          images.push({
            imageUrl: prevImage.url,
            artist: prevImage.name,
            width: (finalWidth - 10).toString() + "px",
            height: finalHeight.toString() + "px",
            discord: prevImage.discord_user,
            twitter: prevImage.twitter_url,
            instagram: prevImage.instagram_url
          });
        }
        currWidth = 0;
        prevIndex = index + 1;
        currHeight = this.maxImageHeight;
      } else {
        currWidth = newCurrWidth;
        currHeight = newCurrHeight;
      }
    }
    return images;
  }

  render() {
    console.log(this.state.images);
    return (
      <div className="main">
        <NavBar />
        <div className="image-container">
          {
            this.state.images.map((val, idx) => {
              return <Image 
                imageUrl={val.imageUrl}
                artist_name={val.artist}
                width={val.width} 
                height={val.height} 
                discord={val.discord}
                twitter={val.twitter}
                instagram={val.instagram}
                key={idx}/>;
            })
          }
        </div>
      </div>
    );
  }
}

export default Main;
