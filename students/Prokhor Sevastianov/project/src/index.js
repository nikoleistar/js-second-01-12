import {fetch as fetchPolyfill} from 'whatwg-fetch'
import "@babel/polyfill"
import mainObj from './public/js/main'
import './public/style/style.css'
import './public/style/normalize.css'

let app = new Vue (mainObj)