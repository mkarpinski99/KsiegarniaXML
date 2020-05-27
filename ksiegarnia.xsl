<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <title>Title</title>
            </head>
            <body>
                <div>
                    <xsl:for-each select="ksiegarnia/ksiazki/dane">
                        <xsl:value-of select="tytul"/>
                        <xsl:for-each select="autorzy">
                            <xsl:value-of select="autor"/>
                        </xsl:for-each>
                    </xsl:for-each>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>