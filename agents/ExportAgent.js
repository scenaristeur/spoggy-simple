// utilisé par js-xlsx pour transformer xls en rdf	


/**
    * Custom agent prototype
    * @param {String} id
    * @constructor
    * @extend eve.Agent
*/
function ExportAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);
    
    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
ExportAgent.prototype = Object.create(eve.Agent.prototype);
ExportAgent.prototype.constructor = ExportAgent;

/**
    * Send a greeting to an agent
    * @param {String} to
*/
ExportAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
};

/**
    * Handle incoming greetings. This overloads the default receive,
    * so we can't use ExportAgent.on(pattern, listener) anymore
    * @param {String} from     Id of the sender
    * @param {*} message       Received message, a JSON object (often a string)
*/
ExportAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');
    
    if (message.indexOf('Hello') === 0) {
        // reply to the greeting
        this.send(from, 'Hi ' + from + ', nice to meet you!');
    }
    
    
};

ExportAgent.prototype.exportGraphe = function(){
    
    console.log("exportation");
    
    var output="@prefix : <http://smag0.blogspot.fr/tempPrefix#> . \n";
    output+="@prefix owl: <http://www.w3.org/2002/07/owl#> . \n";
    output+="@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> . \n";
    output+="@prefix xml: <http://www.w3.org/XML/1998/namespace> . \n";
    output+="@prefix xsd: <http://www.w3.org/2001/XMLSchema#> . \n";
    output+="@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . \n";
    output+="@prefix smag: <http://smag0.blogspot.fr/tempPrefix#> . \n";
    output+="@base <http://smag0.blogspot.fr/tempPrefix> . \n";
    output+="<http://smag0.blogspot.fr/tempPrefix> rdf:type owl:Ontology ;  \n";
    output+="                    owl:versionIRI <http://smag0.blogspot.fr/tempPrefix/1.0.0> . \n";
    output+=" \n";
    output+="owl:Class rdfs:subClassOf owl:Thing .  \n";
    output+="owl:Class rdf:type owl:Class . \n";
    output+="owl:Ontology rdf:type owl:Thing .  \n\n";
    
    var listeInfos = new Array();
    var listeComplementaire = new Array();
    
    for ( i=0;i<statements.length;i++){
        var statement=statements[i];
        
        var sujet=statement.sujet;
        var propriete=statement.propriete;
        var objet=statement.objet;
        
        
        //string.indexOf(substring) > -1
        
        var sujetWithPrefix=sujet.texte;
        var proprieteWithPrefix=propriete;
        var objetWithPrefix=objet.texte;
        
        if (sujetWithPrefix.indexOf(':') == -1){ // ne contient pas de ':'
            sujetWithPrefix=':'+sujetWithPrefix;
        }
        
        if (objetWithPrefix.indexOf(':') == -1){ // ne contient pas de ':'
            objetWithPrefix=':'+objetWithPrefix;
        }      
        
        if (proprieteWithPrefix.indexOf(':') == -1){ // ne contient pas de ':'
            proprieteWithPrefix=':'+proprieteWithPrefix;
            
        }
        
        
        if ((proprieteWithPrefix == ":type") || (proprieteWithPrefix == "rdf:type")){
            proprieteWithPrefix="rdf:type";
            listeComplementaire.push(objetWithPrefix+" rdf:type owl:Class . \n");
            
            
            
            }else if  ((proprieteWithPrefix == "subClassOf") || (proprieteWithPrefix == ":subClassOf") || (proprieteWithPrefix == "rdfs:subClassOf")){
            proprieteWithPrefix="rdfs:subClassOf";
        }
        
        
        
        
        
        var data=sujetWithPrefix+" "+proprieteWithPrefix+" "+objetWithPrefix+" . \n";
        listeInfos[i]=data;
    }
    
    
    
    // console.log (listeInfos);
    for ( j=0;j<listeInfos.length;j++){
        output=output+listeInfos[j];   
        // console.log(output);
    }
    
    for ( k=0;j<listeComplementaire.length;k++){
        output=output+listeComplementaire[j];   
        // console.log(output);
    }
    
    
    document.getElementById("inputTextToSave").value =output; 
    
    if (document.getElementById("inputFileNameToSaveAs").value == ""){
        console.log("vide");
        var nomFichier = prompt('Quel sera le nom du fichier exporté ?','fichier');
        document.getElementById("inputFileNameToSaveAs").value = nomFichier;
        }      else{
        console.log(document.getElementById("inputFileNameToSaveAs").value);
        
    }
}

ExportAgent.prototype.saveTextAsFile = function(data,nomFichier,extension)
{
    //EXPORT https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
    
    var textToWrite="";
    var fileNameToSaveAs="";
    var textFileAsBlob="";
    
    console.log(data);
    
    if((typeof data != "undefined")&& (data.length>0)){
        textToWrite=data;    
        }else{
        textToWrite = document.getElementById("inputTextToSave").value;
    }  
    
    if ((typeof nomFichier != "undefined") && (nomFichier.length>0)){
        fileNameToSaveAs = nomFichier+"."+extension;
        }else{
        fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value+"."+extension;
    }
    
    
    if ((typeof extension != "undefined") && (extension.length>0)){
        switch(extension){
            case "ttl" :
            textFileAsBlob = new Blob([textToWrite], {
                type:
                'text/turtle'
            }
            );
            break;
            case "rdf" :
            textFileAsBlob = new Blob([textToWrite], {
                type:
                'application/rdf+xml'
                }
            );
            break;
            default :
     console.log("non traite  , extension : "+extension);
            break;
        }      
    } 
    
    
                console.log(nomFichier+" : "+extension);

    
    
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    
    downloadLink.click();
}

ExportAgent.prototype.saveTextAsFileRDF= function ()
{
    //voir http://mowl-power.cs.man.ac.uk:8080/converter/restful.jsp
    var textToWrite = document.getElementById("inputTextToSave").value;
    
    if (socketConnected) {
        // json=("{\"message\":\""+ reader.result+"\",\"type\":\"conversion\",\"formatIn\":\"ttl\",\"formatOut\":\"rdfXml\"}");
        // var testjson = JSON.stringify(eval("(" +  reader.result + ")"));
        var testjson = {
            type: 
            "conversion", formatIn:
            "ttl", formatOut:
            "rdfXml", expediteur:
            "saveAsRDF", message:
            textToWrite
        };
        // e.dataTransfer.setData("text/plain", JSON.stringify(testjson));
        //     json=("{\"type\":\"conversion\",\"formatIn\":\"ttl\",\"formatOut\":\"rdfXml\",\"message\":\""+ JSON.stringify(testjson)+"\"}");
        // dreamcatcherServersend(JSON.stringify(testjson));
        var messageJSON=JSON.stringify(testjson);
        //e.dataTransfer.setData("text/plain", JSON.stringify(testjson));
        console.log("envoi vers websocketDreamCatcher de "+messageJSON);
        websocketDreamCatcher.send(messageJSON);
    }
}
