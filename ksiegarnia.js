var content;
var selectedBook;
var panelState = 0;


function loadXMLDoc(filename)
{
    if (window.ActiveXObject)
    {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else
    {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
}

function displayResult()
{
    xml = loadXMLDoc("ksiegarnia.xml");
    xsl = loadXMLDoc("ksiegarnia.xsl");
// code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document")
    {
        ex = xml.transformNode(xsl);
        content = ex;
        document.getElementById("content").innerHTML = ex;
    }
// code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument)
    {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        content = resultDocument;
        document.getElementById("content").appendChild(resultDocument);
    }

    kategorie = xml.getElementsByTagName("kategoria");
    katNode = document.getElementById("kategoria");
    for(i = 0; i < kategorie.length; i++){
        s = document.createElement("option");
        s.innerHTML = kategorie.item(i).textContent;
        katNode.appendChild(s);
    }
    jezyki = xml.getElementsByTagName("jezyk");
    jezNode = document.getElementById("jezyk");
    for(i = 0; i < kategorie.length; i++){
        s = document.createElement("option");
        s.innerHTML = jezyki.item(i).textContent;
        jezNode.appendChild(s);
    }
}

function submitBook() {
        ksiazkaNode = document.createElement("div")
        ksiazkaNode.setAttribute("class", "ksiazka");

        if(panelState == 0){
            id = document.getElementsByClassName("ksiazki")[0].lastChild.getAttribute("id");
            id = id.substring(1);
            id = parseInt(id, 10) + 1;
            selectedBook = "k" + id;
        }
        ksiazkaNode.setAttribute("id", selectedBook);

        daneNode = document.createElement("div")
        daneNode.setAttribute("class", "dane");

        tytul = document.getElementById("tytul").value;
        tytulNode = document.createElement("div");
        tytulNode.setAttribute("class", "tytul");
        tytulNode.innerHTML = tytul;
        daneNode.appendChild(tytulNode);

        autorzy = document.getElementsByName("autor");
        autorzyNode = document.createElement("div");
        autorzyNode.setAttribute("class", "autorzy");
        for (i = 0; i < autorzy.length; i++) {
            a = document.createElement("div");
            a.setAttribute("class", "autor");
            a.innerHTML = autorzy[i].value;
            autorzyNode.appendChild(a);
        }
        daneNode.appendChild(autorzyNode);

        data_wydania = document.getElementById("data_wydania").value;
        data_wydaniaNode = document.createElement("div");
        data_wydaniaNode.setAttribute("class", "data_wydania");
        data_wydaniaNode.innerHTML = data_wydania;
        daneNode.appendChild(data_wydaniaNode);

        strony = document.getElementById("strony").value;
        stronyNode = document.createElement("div");
        stronyNode.setAttribute("class", "strony");
        stronyNode.innerHTML = strony;
        daneNode.appendChild(stronyNode);

        wymiaryNode = document.createElement("div");
        wymiaryNode.setAttribute("class", "wymiary");
        jednostka = document.getElementById("jednostka").value;

        dlugosc = document.getElementById("dlugosc").value;
        if (dlugosc != "") {
            dlugoscNode = document.createElement("div");
            dlugoscNode.setAttribute("class", "dlugosc");
            dlugoscNode.innerHTML = dlugosc + jednostka;
            wymiaryNode.appendChild(dlugoscNode);
        }
        szerokosc = document.getElementById("szerokosc").value;
        if (szerokosc != "") {
            szerokoscNode = document.createElement("div");
            szerokoscNode.setAttribute("class", "szerokosc");
            szerokoscNode.innerHTML = szerokosc + jednostka;
            wymiaryNode.appendChild(szerokoscNode);
        }
        grubosc = document.getElementById("grubosc").value;
        if (grubosc != "") {
            gruboscNode = document.createElement("div");
            gruboscNode.setAttribute("class", "grubosc");
            gruboscNode.innerHTML = grubosc + jednostka;
            wymiaryNode.appendChild(gruboscNode);
        }
        if (grubosc != "" || szerokosc != "" || dlugosc != "") {
            daneNode.appendChild(wymiaryNode);
        }

        ksiazkaNode.appendChild(daneNode);

        ksiazkaBoxNode = document.createElement("div");
        ksiazkaBoxNode.setAttribute("class", "ksiazkaBox");
        typ = document.getElementById("typ").value;
        typNode = document.createElement("div");
        typNode.setAttribute("class", "typ");
        typNode.innerHTML = typ;
        ksiazkaBoxNode.appendChild(typNode);
        if (typ === "papierowa") {
            okladka = document.getElementById("okladka").value;
            okladkaNode = document.createElement("div");
            okladkaNode.setAttribute("class", "okladka");
            okladkaNode.innerHTML = okladka;
            ksiazkaBoxNode.appendChild(okladkaNode);
        }

        kategoria = document.getElementById("kategoria").value;
        kategoriaNode = document.createElement("div");
        kategoriaNode.setAttribute("class", "kategoria");
        kategoriaNode.innerHTML = kategoria;
        ksiazkaBoxNode.appendChild(kategoriaNode);

        jezyk = document.getElementById("jezyk").value;
        jezykNode = document.createElement("div");
        jezykNode.setAttribute("class", "jezyk");
        jezykNode.innerHTML = jezyk;
        ksiazkaBoxNode.appendChild(jezykNode);

        opis = document.getElementById("opis").value;
        if (opis != null) {
            opisNode = document.createElement("div");
            opisNode.setAttribute("class", "opis");
            opisNode.innerHTML = opis;
            ksiazkaBoxNode.appendChild(opisNode);
        }

        ksiazkaNode.appendChild(ksiazkaBoxNode);


        cena = document.getElementById("cena").value;
        waluta = document.getElementById("waluta").value;
        cenaNode = document.createElement("div");
        cenaNode.setAttribute("class", "cena");
        cenaNode.innerHTML = cena + waluta;
        ksiazkaNode.appendChild(cenaNode);

        bookPanelNode = document.createElement("div");
        bookPanelNode.setAttribute("class", "bookPanel");
        removeBookNode = document.createElement("button");
        removeBookNode.setAttribute("onclick", "removeBook(this)");
        removeBookNode.innerHTML = "Usuń";
        updateBookNode = document.createElement("button");
        updateBookNode.setAttribute("onclick", "updateBook(this)");
        updateBookNode.innerHTML = "Aktualizuj";
        bookPanelNode.appendChild(removeBookNode);
        bookPanelNode.appendChild(updateBookNode);
        ksiazkaNode.appendChild(bookPanelNode);

        document.getElementsByClassName("ksiazki")[0].appendChild(ksiazkaNode);
}

function search() {
    searchText = document.getElementById("searchInput").value;
    tytul = document.getElementsByClassName("tytul");

    if(searchText != "") {
        showAll();
        for (i = 0; i < tytul.length; i++) {
            if (tytul[i].innerHTML != searchText) {
                node = tytul[i].parentNode.parentNode;
                node.style.display = "none";
            }
        }
    }else{
        showAll();
    }
}

function showAll() {
    ksiazka = document.getElementsByClassName("ksiazka");

    for (i = 0; i < ksiazka.length; i++) {
            ksiazka[i].style.display = "flex";

        }
}

function removeBook(btn) {
    id = btn.parentNode.parentNode.getAttribute("id");

    document.getElementById(id).remove();
}

function typFilter(select) {
    if (select.value == "wszystkie") {
        showAll();
    } else {
        typ = document.getElementsByClassName("typ");
        for (i = 0; i < typ.length; i++) {
            node = typ[i].parentNode.parentNode;
            if (typ[i].innerHTML != select.value) {
                node.style.display = "none";
            } else {
                node.style.display = "flex";
            }
        }
    }
    if (select.value == "ebook") {
        document.getElementById("okladkaSelect").style.display = "none";
    } else {
        document.getElementById("okladkaSelect").style.display = "inline";
    }
}
function okladkaFilter(select) {
    if (select.value == "wszystkie") {
        typFilter(document.getElementById("typSelect"));
    } else {
        okladka = document.getElementsByClassName("okladka");
        for (i = 0; i < okladka.length; i++) {
            node = okladka[i].parentNode.parentNode;
            if (okladka[i].innerHTML != select.value) {
                node.style.display = "none";
            }else{
                node.style.display = "flex";
            }
        }
    }
}


function addBook() {
    panelState = 0;
    submitBook();
}

function updateBook(btn) {
    selectedBook = btn.parentNode.parentNode.getAttribute("id");
    panelState = 1;
    document.getElementById(selectedBook).lastChild.childNodes.item(0).click();
    submitBook();
}

function addAutor() {
    a = document.createElement("div");
    b = document.createElement("label");
    c = document.createElement("input");
    c.setAttribute("type", "text");
    c.setAttribute("name", "autor");
    a.appendChild(b);
    a.appendChild(c);

    document.getElementById("autorzyForm").insertBefore(a, document.getElementById("addAutor"));
}