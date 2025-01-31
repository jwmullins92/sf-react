import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import REACT_APP from '@salesforce/resourceUrl/MyReactApp'; // Reference to Static Resource

export default class SimpleReact extends LightningElement {
    reactJsLoaded = false;

    renderedCallback() {
        if (this.reactJsLoaded) {
            return;
        }
        this.reactJsLoaded = true;

        // Resolve paths for CSS and JS relative to the dynamically served static resource
        const cssPath = `${REACT_APP}/styles.css`;
        const jsPath = `${REACT_APP}/bundle.js`;

        // Load React app's CSS and JS files
        Promise.all([
            loadStyle(this, cssPath),
            loadScript(this, jsPath),
        ])
            .then(() => {
                // Mount the React app inside the LWC container div
                const root = this.template.querySelector('.react-container');
                ReactDOM.render(React.createElement(App), root);
            })
            .catch(error => {
                console.error('Error loading React app', error);
            });
    }
}
