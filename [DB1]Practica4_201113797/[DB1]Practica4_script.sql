
-- -----------------------------------------------------
-- Table "mydb"."TIPO_BUS"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "TIPO_BUS" (
  "idTIPO_BUS" SERIAL NOT NULL,
  "NOMBRE" VARCHAR(45) NOT NULL,
  "DESCRIPCION" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("idTIPO_BUS"));


-- -----------------------------------------------------
-- Table "mydb"."BUS"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "BUS" (
  "idBUS" SERIAL NOT NULL,
  "TIPO_BUS_idTIPO_BUS" INT NOT NULL,
  "CONDUCTOR" VARCHAR(45) NOT NULL,
  "CAPACIDAD" INT NOT NULL,
  PRIMARY KEY ("idBUS"),CONSTRAINT "fk_BUS_TIPO_BUS"
    FOREIGN KEY ("TIPO_BUS_idTIPO_BUS")
    REFERENCES "TIPO_BUS" ("idTIPO_BUS")
  );


-- -----------------------------------------------------
-- Table "mydb"."RUTA"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "RUTA" (
  "idRUTA" SERIAL NOT NULL,
  "ORIGEN" VARCHAR(45) NOT NULL,
  "DESTINO" VARCHAR(45) NULL,
  PRIMARY KEY ("idRUTA"));


-- -----------------------------------------------------
-- Table "mydb"."VIAJE"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "VIAJE" (
  "idVIAJE" SERIAL NOT NULL,
  "ORIGEN" VARCHAR(45) NOT NULL,
  "DESTINO" VARCHAR(45) NOT NULL,
  "KMS" INT NOT NULL,
  PRIMARY KEY ("idVIAJE"));


-- -----------------------------------------------------
-- Table "mydb"."PASAJERO"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "PASAJERO" (
  "idPASAJERO" INT NOT NULL,
  "NOMBRE" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("idPASAJERO"));


-- -----------------------------------------------------
-- Table "mydb"."RESERVACION"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "RESERVACION" (
  "idRESERVACION" SERIAL NOT NULL,
  "PASAJERO_idPASAJERO" INT NOT NULL,
  "FECHA" DATE NOT NULL,
  PRIMARY KEY ("idRESERVACION"),
  CONSTRAINT "fk_RESERVACION_PASAJERO1"
    FOREIGN KEY ("PASAJERO_idPASAJERO")
    REFERENCES "PASAJERO" ("idPASAJERO")
    );


-- -----------------------------------------------------
-- Table "mydb"."FACTURA"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "FACTURA" (
  "idFACTURA" SERIAL NOT NULL,
  "PASAJERO_idPASAJERO" INT NOT NULL,
  "TOTAL" INT NOT NULL,
  "FECHA" VARCHAR(45) NULL,
  PRIMARY KEY ("idFACTURA"),
  CONSTRAINT "fk_FACTURA_PASAJERO1"
    FOREIGN KEY ("PASAJERO_idPASAJERO")
    REFERENCES "PASAJERO" ("idPASAJERO")
    );


-- -----------------------------------------------------
-- Table "mydb"."TICKET"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "TICKET" (
  "idTICKET" SERIAL NOT NULL,
  "VIAJE_idVIAJE" INT NOT NULL,
  "RESERVACION_idRESERVACION" INT NOT NULL,
  "FACTURA_idFACTURA" INT NULL,
  "HRA_SALIDA" TIME NOT NULL,
  "HRA_LLEGADA" TIME NOT NULL,
  "COSTO" INT NOT NULL,
  "FECHA" DATE NOT NULL,
  PRIMARY KEY ("idTICKET"),
  CONSTRAINT "fk_TICKET_VIAJE1"
    FOREIGN KEY ("VIAJE_idVIAJE")
    REFERENCES "VIAJE" ("idVIAJE"),
  CONSTRAINT "fk_TICKET_RESERVACION1"
    FOREIGN KEY ("RESERVACION_idRESERVACION")
    REFERENCES "RESERVACION" ("idRESERVACION"),
  CONSTRAINT "fk_TICKET_FACTURA1"
    FOREIGN KEY ("FACTURA_idFACTURA")
    REFERENCES "FACTURA" ("idFACTURA"))
;


-- -----------------------------------------------------
-- Table "mydb"."RUTA_VIAJE"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "RUTA_VIAJE" (
  "RUTA_idRUTA" INT NOT NULL,
  "VIAJE_idVIAJE" INT NOT NULL,
  PRIMARY KEY ("RUTA_idRUTA", "VIAJE_idVIAJE"),
 CONSTRAINT "fk_RUTA_VIAJE_RUTA1"
    FOREIGN KEY ("RUTA_idRUTA")
    REFERENCES "RUTA" ("idRUTA"),
  CONSTRAINT "fk_RUTA_VIAJE_VIAJE1"
    FOREIGN KEY ("VIAJE_idVIAJE")
    REFERENCES "VIAJE" ("idVIAJE"));


-- -----------------------------------------------------
-- Table "mydb"."ASIGNACION_RUTA"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "ASIGNACION_RUTA" (
  "idASIGNACION" SERIAL NOT NULL,
  "BUS_idBUS" INT NOT NULL,
  "RUTA_idRUTA" INT NOT NULL,
 PRIMARY KEY ("idASIGNACION"),
  CONSTRAINT "fk_ASIGNACION_RUTA_BUS1"
    FOREIGN KEY ("BUS_idBUS")
    REFERENCES "BUS" ("idBUS"),
  CONSTRAINT "fk_ASIGNACION_RUTA_RUTA1"
    FOREIGN KEY ("RUTA_idRUTA")
    REFERENCES "RUTA" ("idRUTA"));

