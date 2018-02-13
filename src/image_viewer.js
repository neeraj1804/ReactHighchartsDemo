import '../styles/image_viewer.css';
import small from '../assets/small.jpeg';
//import big from '../assets/big.jpeg';

export default () => {
    const image = document.createElement('img');
    image.src = small;

    document.body.appendChild(image);
}

/*const bigImage = document.createElement("img");
bigImage.src = big;

document.body.appendChild(bigImage);*/