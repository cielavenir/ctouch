/*
 * cTouch (to mimic smartphone) [config fixed] by ciel.
 * javascript imitation / touch event / modifying UserAgent -> all in one.
 * 
 * [Potion Notice]
 * ctouch_imitation (C) kwaijp@yahoo.co.jp <http://mpw.jp/> under GNU GPL.
 * ctouch_touch.js (C) @jkumo.
 * navigator.* writer by wakuworks.
*/

//var ctouch_option=sessionStorage;
//if(typeof ctouch_option["preferedUA"] === "undefined")document.location.href=document.location.href; //reload...

function init(){
	var s;
	//s = document.createElement("script");
	//s.type = "text/javascript";
	//s.id = "ctouch_touch_js";
	//s.src = chrome.extension.getURL("ctouch_touch.js"); // need to embed to DOM to access x.ontouchstart().
	//document.documentElement.appendChild(s); //DOM isn't constructed yet. inserted to before any javascripts.

	//if(ctouch_option["enable_imitation"] && ctouch_option["preferedUA"]!="0"){
		//var useragent=ctouch_option["UA"+ctouch_option["preferedUA"]];
		var useragent="Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; SonyEricssonLT26i Build/6.0.A.3.73) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";
		var platform="none";
		var vendor="";
		if(useragent.indexOf("Android")!=-1){
			vendor="Google, Inc.";
			//platform="Linux i686"; //Android Atom machine :p
			platform="Linux armv7l";
		}
		if(useragent.indexOf("iPhone")!=-1){
			vendor="Apple Computer, Inc.";
			platform="iPhone";
		}
		if(useragent.indexOf("iPod")!=-1){
			vendor="Apple Computer, Inc.";
			platform="iPod";
		}
		if(useragent.indexOf("iPad")!=-1){
			vendor="Apple Computer, Inc.";
			platform="iPad";
		}
		if(platform=="none")return;

		s = document.createElement("script");
		s.type = "text/javascript";
		s.id = "ctouch_imitation_js";
		s.innerText = "";

/// GPL BLOCK START ///
// ----------------------------------------------------------------------------
// Copyright (C) 2011 kwaijp@yahoo.co.jp <http://mpw.jp/>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
// ----------------------------------------------------------------------------
s.innerText += "\
document.createExpression = null;\
document.createNSResolver = null;\
document.createTouch = function createTouch(){return;};\
document.createTouchList = function createTouchList(){return;};\
document.documentElement.createTouch = function(){return;};\
document.documentElement.createTouchList = function(){return;};\
document.evaluate = null;\
document.webkitHidden = null;\
document.webkitVisibilityState = null;\
window.ArrayBuffer = null;\
window.CSSVariablesDeclaration = function CSSVariablesDeclaration(){return;};\
window.CSSVariablesRule = function CSSVariablesRule(){return;};\
window.CanvasGradient = null;\
window.CanvasPattern = null;\
window.CloseEvent = null;\
window.DOMSettableTokenList = null;\
window.DOMStringList = null;\
window.DOMStringMap = null;\
window.DOMTokenList = null;\
window.DataView = null;\
window.DeviceOrientationEvent = null;\
window.EventSource = null;\
window.FileError = null;\
window.FileReader = null;\
window.Float32Array = null;\
window.Float64Array = null;\
window.FormData = null;\
window.HTMLKeygenElement = null;\
window.HTMLMeterElement = null;\
window.HTMLOutputElement = null;\
window.HTMLProgressElement = null;\
window.HashChangeEvent = null;\
window.Int16Array = null;\
window.Int32Array = null;\
window.Int8Array = null;\
window.MessageChannel = null;\
window.MessagePort = null;\
window.PERSISTENT = null;\
window.SQLException = null;\
window.SVGAElement = null;\
window.SVGAltGlyphElement = null;\
window.SVGAngle = null;\
window.SVGAnimateColorElement = null;\
window.SVGAnimateElement = null;\
window.SVGAnimateTransformElement = null;\
window.SVGAnimatedAngle = null;\
window.SVGAnimatedBoolean = null;\
window.SVGAnimatedEnumeration = null;\
window.SVGAnimatedInteger = null;\
window.SVGAnimatedLength = null;\
window.SVGAnimatedLengthList = null;\
window.SVGAnimatedNumber = null;\
window.SVGAnimatedNumberList = null;\
window.SVGAnimatedPreserveAspectRatio = null;\
window.SVGAnimatedRect = null;\
window.SVGAnimatedString = null;\
window.SVGAnimatedTransformList = null;\
window.SVGCircleElement = null;\
window.SVGClipPathElement = null;\
window.SVGColor = null;\
window.SVGComponentTransferFunctionElement = null;\
window.SVGCursorElement = null;\
window.SVGDefsElement = null;\
window.SVGDescElement = null;\
window.SVGDocument = null;\
window.SVGElement = null;\
window.SVGElementInstance = null;\
window.SVGElementInstanceList = null;\
window.SVGEllipseElement = null;\
window.SVGException = null;\
window.SVGFEBlendElement = null;\
window.SVGFEColorMatrixElement = null;\
window.SVGFEComponentTransferElement = null;\
window.SVGFECompositeElement = null;\
window.SVGFEConvolveMatrixElement = null;\
window.SVGFEDiffuseLightingElement = null;\
window.SVGFEDisplacementMapElement = null;\
window.SVGFEDistantLightElement = null;\
window.SVGFEDropShadowElement = null;\
window.SVGFEFloodElement = null;\
window.SVGFEFuncAElement = null;\
window.SVGFEFuncBElement = null;\
window.SVGFEFuncGElement = null;\
window.SVGFEFuncRElement = null;\
window.SVGFEGaussianBlurElement = null;\
window.SVGFEImageElement = null;\
window.SVGFEMergeElement = null;\
window.SVGFEMergeNodeElement = null;\
window.SVGFEMorphologyElement = null;\
window.SVGFEOffsetElement = null;\
window.SVGFEPointLightElement = null;\
window.SVGFESpecularLightingElement = null;\
window.SVGFESpotLightElement = null;\
window.SVGFETileElement = null;\
window.SVGFETurbulenceElement = null;\
window.SVGFilterElement = null;\
window.SVGFontElement = null;\
window.SVGFontFaceElement = null;\
window.SVGFontFaceFormatElement = null;\
window.SVGFontFaceNameElement = null;\
window.SVGFontFaceSrcElement = null;\
window.SVGFontFaceUriElement = null;\
window.SVGForeignObjectElement = null;\
window.SVGGElement = null;\
window.SVGGlyphElement = null;\
window.SVGGradientElement = null;\
window.SVGHKernElement = null;\
window.SVGImageElement = null;\
window.SVGLength = null;\
window.SVGLengthList = null;\
window.SVGLineElement = null;\
window.SVGLinearGradientElement = null;\
window.SVGMarkerElement = null;\
window.SVGMaskElement = null;\
window.SVGMatrix = null;\
window.SVGMetadataElement = null;\
window.SVGMissingGlyphElement = null;\
window.SVGNumber = null;\
window.SVGNumberList = null;\
window.SVGPaint = null;\
window.SVGPathElement = null;\
window.SVGPathSeg = null;\
window.SVGPathSegArcAbs = null;\
window.SVGPathSegArcRel = null;\
window.SVGPathSegClosePath = null;\
window.SVGPathSegCurvetoCubicAbs = null;\
window.SVGPathSegCurvetoCubicRel = null;\
window.SVGPathSegCurvetoCubicSmoothAbs = null;\
window.SVGPathSegCurvetoCubicSmoothRel = null;\
window.SVGPathSegCurvetoQuadraticAbs = null;\
window.SVGPathSegCurvetoQuadraticRel = null;\
window.SVGPathSegCurvetoQuadraticSmoothAbs = null;\
window.SVGPathSegCurvetoQuadraticSmoothRel = null;\
window.SVGPathSegLinetoAbs = null;\
window.SVGPathSegLinetoHorizontalAbs = null;\
window.SVGPathSegLinetoHorizontalRel = null;\
window.SVGPathSegLinetoRel = null;\
window.SVGPathSegLinetoVerticalAbs = null;\
window.SVGPathSegLinetoVerticalRel = null;\
window.SVGPathSegList = null;\
window.SVGPathSegMovetoAbs = null;\
window.SVGPathSegMovetoRel = null;\
window.SVGPatternElement = null;\
window.SVGPoint = null;\
window.SVGPointList = null;\
window.SVGPolygonElement = null;\
window.SVGPolylineElement = null;\
window.SVGPreserveAspectRatio = null;\
window.SVGRadialGradientElement = null;\
window.SVGRect = null;\
window.SVGRectElement = null;\
window.SVGRenderingIntent = null;\
window.SVGSVGElement = null;\
window.SVGScriptElement = null;\
window.SVGSetElement = null;\
window.SVGStopElement = null;\
window.SVGStringList = null;\
window.SVGStyleElement = null;\
window.SVGSwitchElement = null;\
window.SVGSymbolElement = null;\
window.SVGTRefElement = null;\
window.SVGTSpanElement = null;\
window.SVGTextContentElement = null;\
window.SVGTextElement = null;\
window.SVGTextPathElement = null;\
window.SVGTextPositioningElement = null;\
window.SVGTitleElement = null;\
window.SVGTransform = null;\
window.SVGTransformList = null;\
window.SVGUnitTypes = null;\
window.SVGUseElement = null;\
window.SVGVKernElement = null;\
window.SVGViewElement = null;\
window.SVGZoomEvent = null;\
window.SharedWorker = null;\
window.TEMPORARY = null;\
window.TimeRanges = null;\
window.Uint16Array = null;\
window.Uint32Array = null;\
window.Uint8Array = null;\
window.WebGLActiveInfo = null;\
window.WebGLBuffer = null;\
window.WebGLFramebuffer = null;\
window.WebGLProgram = null;\
window.WebGLRenderbuffer = null;\
window.WebGLRenderingContext = null;\
window.WebGLShader = null;\
window.WebGLTexture = null;\
window.WebGLUniformLocation = null;\
window.WebKitBlobBuilder = null;\
window.WebKitFlags = null;\
window.WebSocket = null;\
window.Worker = null;\
window.XPathEvaluator = null;\
window.XPathException = null;\
window.XPathResult = null;\
window.XSLTProcessor = null;\
window.chrome = null;\
window.external = null;\
window.matchMedia = null;\
window.media = new Object();\
window.ondeviceorientation = null;\
window.onorientationchange = null;\
window.orientation = 0;\
window.performance = null;\
window.styleMedia = null;\
window.v8Locale = null;\
window.webkitCancelRequestAnimationFrame = null;\
window.webkitIDBCursor = null;\
window.webkitIDBDatabase = null;\
window.webkitIDBDatabaseError = null;\
window.webkitIDBDatabaseException = null;\
window.webkitIDBFactory = null;\
window.webkitIDBIndex = null;\
window.webkitIDBKeyRange = null;\
window.webkitIDBObjectStore = null;\
window.webkitIDBRequest = null;\
window.webkitIDBTransaction = null;\
window.webkitIndexedDB = null;\
window.webkitNotifications = null;\
window.webkitRequestAnimationFrame = null;\
window.webkitRequestFileSystem = null;\
window.webkitResolveLocalFileSystemURL = null;\
window.webkitStorageInfo = null;\
window.webkitURL = null;";
/// GPL BLOCK END ///

// my original bypass
s.innerText += "\
document.ondragstart = function(){return false;};\
document.ontouchstart = function(){return;};\
document.documentElement.ontouchstart = function(){return;};\
window.ondragstart = function(){return false;};\
window.ontouchstart = null;\
";

if(vendor == "Apple Computer, Inc."){
	s.innerText+="document.ongesturestart = function(){return;};";
	s.innerText+="document.documentElement.ongesturestart = function(){return;};";
	s.innerText+="window.ongesturestart = null;";
}

// http://jsdo.it/wakuworks/userAgent.test
s.innerText += "\
try {\
	if (!Object.prototype.__defineGetter__ &&\
		Object.defineProperty({}, 'x', { get: function(){ return true } }).x\
	) {\
		Object.defineProperty(Object.prototype, '__defineGetter__', {\
			enumerable: false,\
			configurable: true,\
			value: function(name, func) {\
				Object.defineProperty(this,name, {\
					get: func,\
					enumerable: true,\
					configurable: true\
				});\
			}\
		});\
		Object.defineProperty(Object.prototype, '__defineSetter__', {\
			enumerable: false,\
			configurable: true,\
			value: function(name, func) {\
				Object.defineProperty(this,name, {\
					set: func,\
					enumerable: true,\
					configurable: true\
				});\
			}\
		});\
	}\
}catch(defPropException){}\
var __original = navigator;\
var navigator = {};\
navigator.__proto__ = __original;\
if(navigator.__defineGetter__){\
	navigator.__defineGetter__('userAgent', function () { return '"+useragent+"'; });\
	navigator.__defineGetter__('vendor', function () { return '"+vendor+"'; });\
	navigator.__defineGetter__('platform', function () { return '"+platform+"'; });\
}else{\
	navigator.userAgent = '"+useragent+"';\
	navigator.vendor = '"+vendor+"';\
	navigator.platform = '"+platform+"';\
}\
var myself = document.getElementById('ctouch_imitation_js');\
myself.parentNode.removeChild(myself);";
		document.documentElement.appendChild(s);
	//}
}
init();
