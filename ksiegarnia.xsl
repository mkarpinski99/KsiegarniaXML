<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html lang="pl">
            <head>
                <meta charset="UTF-8"/>
                <title>Title</title>
                <link rel="stylesheet" href="ksiegarniaxslt.css"/>
            </head>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="ksiazki">
        <div class="ksiazki">
            <xsl:for-each select="ksiazka">
                <xsl:variable name="id" select="@id"/>
                <div id="{$id}" class="ksiazka">
                    <div class="dane">
                        <div class="tytul">
                            <xsl:value-of select="dane/tytul"/>
                        </div>
                        <div class="autorzy">
                            <xsl:for-each select="dane/autorzy/autor">
                                <div class="autor">
                                    <xsl:value-of select="."/>
                                </div>
                            </xsl:for-each>
                        </div>
                        <div class="data_wydania">
                            <xsl:value-of select="dane/data_wydania"/>
                        </div>
                        <div class="strony">
                            <xsl:value-of select="dane/strony"/>
                        </div>
                            <xsl:if test="dane/wymiary">
                                <div class="wymiary">
                                    <xsl:variable name="jednostka" select="dane/wymiary/@jednostka"/>
                                    <xsl:if test="dane/wymiary/dlugosc">
                                        <div class="dlugosc">
                                            <xsl:value-of select="dane/wymiary/dlugosc"/>
                                            <xsl:value-of select="$jednostka"/>
                                        </div>
                                    </xsl:if>
                                    <xsl:if test="dane/wymiary/szerokosc">
                                        <div class="szerokosc">
                                            <xsl:value-of select="dane/wymiary/szerokosc"/>
                                            <xsl:value-of select="$jednostka"/>
                                        </div>
                                    </xsl:if>
                                    <xsl:if test="dane/wymiary/grubosc">
                                        <div class="grubosc">
                                            <xsl:value-of select="dane/wymiary/grubosc"/>
                                            <xsl:value-of select="$jednostka"/>
                                        </div>
                                    </xsl:if>
                                </div>
                            </xsl:if>
                    </div>
                    <div class="ksiazkaBox">
                        <div class="typ">
                            <xsl:value-of select="@typ"/>
                        </div>
                        <xsl:if test="@okladka">
                            <div class="okladka">
                                <xsl:value-of select="@okladka"/>
                            </div>
                        </xsl:if>
                        <div class="kategoria">
                            <xsl:variable name="kategoria" select="@kategoria"/>
                            <xsl:value-of select="//kategorie/kategoria[@skrot=$kategoria]"/>
                        </div>
                        <div class="jezyk">
                            <xsl:variable name="jezyk" select="@jezyk"/>
                            <xsl:value-of select="//jezyki/jezyk[@skrot=$jezyk]"/>
                        </div>
                        <xsl:if test="opis">
                            <div class="opis">
                                <xsl:value-of select="opis"/>
                            </div>
                        </xsl:if>
                    </div>
                    <div class="cena">
                        <xsl:variable name="waluta" select="cena/@waluta"/>
                        <xsl:value-of select="cena"/>
                        <xsl:value-of select="$waluta"/>
                    </div>
                    <div class="bookPanel">
                        <button onclick="removeBook(this)">Usuń</button>
                        <button onclick="updateBook(this)">Aktualizuj</button>
                    </div>
                </div>
            </xsl:for-each>
        </div>
    </xsl:template>

    <xsl:template match="jezyki"/>
    <xsl:template match="kategorie"/>

</xsl:stylesheet>