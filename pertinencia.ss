@charset "UTF-8";
.row {
  flex-direction: row;
}

.row-reverse {
  flex-direction: row-reverse;
}

.column {
  flex-direction: column;
}

.column-reverse {
  flex-direction: column-reverse;
}

/* Flex Container */
.container {
  margin: 0 auto;
  display: flex;
}

/* Flex Item */
.item {
  /* O flex: 1 é necessário para que cada item se expanda ocupando o tamanho máximo do container. */
  flex: 1;
  background: #02154B;
  text-align: center;
  font-size: 1.5em;
}

.line {
  margin: 0;
  border-right: 1px solid white;
  border-left: 1px solid white;
}

.title {
  max-height: 48px;
  font-size: 1em;
  white-space: nowrap;
  border-right: 1px solid white;
  border-left: 1px solid white;
  padding-left: 1.5px;
  padding-right: 1.5px;
}

h1 {
  text-align: center;
  margin: 20px 0 0 0;
  font-size: 1.25em;
  font-weight: normal;
}

body {
  font-family: monospace;
  color: white;
}

form {
  color: black;
}

#expression {
  width: 100%;
}

/*# sourceMappingURL=pertinencia.ss.map */
