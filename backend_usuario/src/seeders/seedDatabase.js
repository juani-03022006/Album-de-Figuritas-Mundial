function photoUrl(teamSeed, nro) {
  return `https://picsum.photos/seed/${teamSeed}-${nro}/300/420`;
}

function teamPhotoUrl(teamSeed) {
  return `https://picsum.photos/seed/${teamSeed}-team/600/420`;
}

const posiciones = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero', 'Técnico'];

const seleccionesData = [
  {
    codigo: 'ARG',
    nombre: 'ARGENTINA',
    asociacion: 'Asociación del Fútbol Argentino',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
    nroDesde: 1,
    nroHasta: 29,
    colorMain: '#8fa7e6',
    colorAccent1: '#f47833',
    colorAccent2: '#3a5bb3',
    colorText: '#1c388c',
    seed: 'arg',
    owned: [1, 2, 3, 5, 17, 22],
    tecnico: {
      nombre: 'Lionel',
      apellido: 'Scaloni',
      fechaNacimiento: '1978-05-16',
      estatura: 1.75,
      peso: 75,
      club: 'Selección Argentina',
    },
    plantel: [
      { nombre: 'Emiliano', apellido: 'Martínez', fechaNacimiento: '1992-09-02', estatura: 1.95, peso: 88, club: 'Aston Villa FC', posicion: 'Arquero' },
      { nombre: 'Nahuel', apellido: 'Molina', fechaNacimiento: '1998-04-06', estatura: 1.75, peso: 70, club: 'Atlético Madrid', posicion: 'Defensor' },
      { nombre: 'Cristian', apellido: 'Romero', fechaNacimiento: '1998-04-27', estatura: 1.85, peso: 78, club: 'Tottenham Hotspur', posicion: 'Defensor' },
      { nombre: 'Nicolás', apellido: 'Otamendi', fechaNacimiento: '1988-02-12', estatura: 1.83, peso: 81, club: 'Benfica', posicion: 'Defensor' },
      { nombre: 'Nicolás', apellido: 'Tagliafico', fechaNacimiento: '1992-08-31', estatura: 1.72, peso: 67, club: 'Olympique Lyon', posicion: 'Defensor' },
      { nombre: 'Leonardo', apellido: 'Balerdi', fechaNacimiento: '1999-01-26', estatura: 1.83, peso: 76, club: 'Olympique Marseille', posicion: 'Defensor' },
      { nombre: 'Enzo', apellido: 'Fernández', fechaNacimiento: '2001-01-17', estatura: 1.78, peso: 76, club: 'Chelsea FC', posicion: 'Mediocampista' },
      { nombre: 'Alexis', apellido: 'Mac Allister', fechaNacimiento: '1998-12-24', estatura: 1.76, peso: 72, club: 'Liverpool FC', posicion: 'Mediocampista' },
      { nombre: 'Rodrigo', apellido: 'De Paul', fechaNacimiento: '1994-05-24', estatura: 1.78, peso: 70, club: 'Atlético Madrid', posicion: 'Mediocampista' },
      { nombre: 'Exequiel', apellido: 'Palacios', fechaNacimiento: '1998-10-05', estatura: 1.77, peso: 68, club: 'Bayer Leverkusen', posicion: 'Mediocampista' },
      { nombre: 'Leandro', apellido: 'Paredes', fechaNacimiento: '1994-06-29', estatura: 1.8, peso: 75, club: 'AS Roma', posicion: 'Mediocampista' },
      { nombre: 'Nico', apellido: 'Paz', fechaNacimiento: '2004-09-08', estatura: 1.86, peso: 76, club: 'Real Madrid', posicion: 'Mediocampista' },
      { nombre: 'Franco', apellido: 'Mastantuono', fechaNacimiento: '2007-08-14', estatura: 1.77, peso: 70, club: 'Real Madrid', posicion: 'Delantero' },
      { nombre: 'Nico', apellido: 'González', fechaNacimiento: '1998-04-06', estatura: 1.8, peso: 72, club: 'Nottingham Forest', posicion: 'Delantero' },
      { nombre: 'Lionel', apellido: 'Messi', fechaNacimiento: '1987-06-24', estatura: 1.7, peso: 72, club: 'Inter Miami CF', posicion: 'Delantero' },
      { nombre: 'Lautaro', apellido: 'Martínez', fechaNacimiento: '1997-08-22', estatura: 1.74, peso: 72, club: 'Inter Milan', posicion: 'Delantero' },
      { nombre: 'Julián', apellido: 'Álvarez', fechaNacimiento: '2000-01-31', estatura: 1.73, peso: 71, club: 'Atlético Madrid', posicion: 'Delantero' },
      { nombre: 'Giuliano', apellido: 'Simeone', fechaNacimiento: '2002-12-18', estatura: 1.79, peso: 73, club: 'Atlético Madrid', posicion: 'Delantero' },
      { nombre: 'Gerónimo', apellido: 'Rulli', fechaNacimiento: '1992-05-20', estatura: 1.89, peso: 84, club: 'Marseille', posicion: 'Arquero' },
      { nombre: 'Lucas', apellido: 'Martínez Quarta', fechaNacimiento: '1996-05-10', estatura: 1.83, peso: 78, club: 'Fiorentina', posicion: 'Defensor' },
      { nombre: 'Giovani', apellido: 'Lo Celso', fechaNacimiento: '1996-04-09', estatura: 1.77, peso: 68, club: 'Real Betis', posicion: 'Mediocampista' },
      { nombre: 'Thiago', apellido: 'Almada', fechaNacimiento: '2001-04-26', estatura: 1.71, peso: 62, club: 'Atlético Madrid', posicion: 'Mediocampista' },
      { nombre: 'Alejandro', apellido: 'Garnacho', fechaNacimiento: '2004-07-01', estatura: 1.8, peso: 72, club: 'Manchester United', posicion: 'Delantero' },
      { nombre: 'Paulo', apellido: 'Dybala', fechaNacimiento: '1993-11-15', estatura: 1.77, peso: 75, club: 'AS Roma', posicion: 'Delantero' },
      { nombre: 'Guido', apellido: 'Rodríguez', fechaNacimiento: '1994-04-12', estatura: 1.85, peso: 78, club: 'West Ham United', posicion: 'Mediocampista' },
      { nombre: 'Valentín', apellido: 'Carboni', fechaNacimiento: '2005-03-24', estatura: 1.82, peso: 74, club: 'Inter Milan', posicion: 'Mediocampista' },
    ],
  },
  {
    codigo: 'ESP',
    nombre: 'SPAIN',
    asociacion: 'Real Federación Española de Fútbol',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg',
    nroDesde: 30,
    nroHasta: 58,
    colorMain: '#e63946',
    colorAccent1: '#ffb703',
    colorAccent2: '#a80000',
    colorText: '#ffffff',
    seed: 'esp',
    owned: [1, 2, 3, 7, 14],
    tecnico: {
      nombre: 'Luis',
      apellido: 'De la Fuente',
      fechaNacimiento: '1961-06-21',
      estatura: 1.73,
      peso: 74,
      club: 'Selección España',
    },
    plantel: [
      { nombre: 'Unai', apellido: 'Simón', fechaNacimiento: '1997-06-11', estatura: 1.89, peso: 88, club: 'Athletic Club', posicion: 'Arquero' },
      { nombre: 'Dani', apellido: 'Carvajal', fechaNacimiento: '1992-01-11', estatura: 1.73, peso: 73, club: 'Real Madrid', posicion: 'Defensor' },
      { nombre: 'Robin', apellido: 'Le Normand', fechaNacimiento: '1996-11-28', estatura: 1.87, peso: 80, club: 'Atlético Madrid', posicion: 'Defensor' },
      { nombre: 'Aymeric', apellido: 'Laporte', fechaNacimiento: '1994-05-27', estatura: 1.89, peso: 85, club: 'Al-Nassr FC', posicion: 'Defensor' },
      { nombre: 'Marc', apellido: 'Cucurella', fechaNacimiento: '1998-07-22', estatura: 1.75, peso: 68, club: 'Chelsea FC', posicion: 'Defensor' },
      { nombre: 'Rodri', apellido: 'Hernández', fechaNacimiento: '1996-06-22', estatura: 1.91, peso: 82, club: 'Manchester City', posicion: 'Mediocampista' },
      { nombre: 'Fabián', apellido: 'Ruiz', fechaNacimiento: '1996-04-03', estatura: 1.89, peso: 70, club: 'Paris Saint-Germain', posicion: 'Mediocampista' },
      { nombre: 'Pedri', apellido: 'González', fechaNacimiento: '2002-11-25', estatura: 1.74, peso: 60, club: 'FC Barcelona', posicion: 'Mediocampista' },
      { nombre: 'Gavi', apellido: 'Páez', fechaNacimiento: '2004-08-05', estatura: 1.73, peso: 68, club: 'FC Barcelona', posicion: 'Mediocampista' },
      { nombre: 'Lamine', apellido: 'Yamal', fechaNacimiento: '2007-07-13', estatura: 1.8, peso: 72, club: 'FC Barcelona', posicion: 'Delantero' },
      { nombre: 'Nico', apellido: 'Williams', fechaNacimiento: '2002-07-12', estatura: 1.81, peso: 67, club: 'Athletic Club', posicion: 'Delantero' },
      { nombre: 'Dani', apellido: 'Olmo', fechaNacimiento: '1998-05-07', estatura: 1.79, peso: 72, club: 'FC Barcelona', posicion: 'Delantero' },
      { nombre: 'Álvaro', apellido: 'Morata', fechaNacimiento: '1992-10-23', estatura: 1.89, peso: 84, club: 'AC Milan', posicion: 'Delantero' },
      { nombre: 'Ferran', apellido: 'Torres', fechaNacimiento: '2000-02-29', estatura: 1.84, peso: 77, club: 'FC Barcelona', posicion: 'Delantero' },
      { nombre: 'Mikel', apellido: 'Oyarzabal', fechaNacimiento: '1997-04-21', estatura: 1.76, peso: 79, club: 'Real Sociedad', posicion: 'Delantero' },
      { nombre: 'Martín', apellido: 'Zubimendi', fechaNacimiento: '1999-02-02', estatura: 1.81, peso: 74, club: 'Real Sociedad', posicion: 'Mediocampista' },
      { nombre: 'David', apellido: 'Raya', fechaNacimiento: '1995-09-15', estatura: 1.83, peso: 80, club: 'Arsenal FC', posicion: 'Arquero' },
      { nombre: 'Pau', apellido: 'Torres', fechaNacimiento: '1997-01-16', estatura: 1.92, peso: 80, club: 'Aston Villa FC', posicion: 'Defensor' },
      { nombre: 'Alejandro', apellido: 'Balde', fechaNacimiento: '2003-10-18', estatura: 1.75, peso: 69, club: 'FC Barcelona', posicion: 'Defensor' },
      { nombre: 'Mikel', apellido: 'Merino', fechaNacimiento: '1996-06-22', estatura: 1.89, peso: 83, club: 'Arsenal FC', posicion: 'Mediocampista' },
      { nombre: 'Álex', apellido: 'Baena', fechaNacimiento: '2001-07-20', estatura: 1.74, peso: 68, club: 'Villarreal CF', posicion: 'Mediocampista' },
      { nombre: 'Joselu', apellido: 'Mato', fechaNacimiento: '1990-03-27', estatura: 1.91, peso: 86, club: 'Real Madrid', posicion: 'Delantero' },
      { nombre: 'Isco', apellido: 'Alarcón', fechaNacimiento: '1992-04-21', estatura: 1.76, peso: 74, club: 'Real Betis', posicion: 'Mediocampista' },
      { nombre: 'Marco', apellido: 'Asensio', fechaNacimiento: '1996-01-21', estatura: 1.82, peso: 76, club: 'Aston Villa FC', posicion: 'Delantero' },
      { nombre: 'Gerard', apellido: 'Moreno', fechaNacimiento: '1992-04-07', estatura: 1.80, peso: 77, club: 'Villarreal CF', posicion: 'Delantero' },
      { nombre: 'Kepa', apellido: 'Arrizabalaga', fechaNacimiento: '1994-10-03', estatura: 1.89, peso: 87, club: 'Arsenal FC', posicion: 'Arquero' },
    ],
  },
  {
    codigo: 'BRA',
    nombre: 'BRAZIL',
    asociacion: 'Confederação Brasileira de Futebol',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',
    nroDesde: 59,
    nroHasta: 87,
    colorMain: '#009c3b',
    colorAccent1: '#ffdf00',
    colorAccent2: '#002776',
    colorText: '#ffffff',
    seed: 'bra',
    owned: [2, 3, 14, 20],
    tecnico: {
      nombre: 'Dorival',
      apellido: 'Júnior',
      fechaNacimiento: '1962-05-25',
      estatura: 1.78,
      peso: 80,
      club: 'Seleção Brasileira',
    },
    plantel: [
      { nombre: 'Alisson', apellido: 'Becker', fechaNacimiento: '1992-10-02', estatura: 1.93, peso: 91, club: 'Liverpool FC', posicion: 'Arquero' },
      { nombre: 'Danilo', apellido: 'Luiz', fechaNacimiento: '1991-07-15', estatura: 1.84, peso: 78, club: 'Botafogo', posicion: 'Defensor' },
      { nombre: 'Marquinhos', apellido: 'Correa', fechaNacimiento: '1994-05-14', estatura: 1.83, peso: 75, club: 'Paris Saint-Germain', posicion: 'Defensor' },
      { nombre: 'Gabriel', apellido: 'Magalhães', fechaNacimiento: '1997-12-19', estatura: 1.9, peso: 78, club: 'Arsenal FC', posicion: 'Defensor' },
      { nombre: 'Wendell', apellido: 'Nascimento', fechaNacimiento: '1993-08-25', estatura: 1.76, peso: 72, club: 'Porto FC', posicion: 'Defensor' },
      { nombre: 'Casemiro', apellido: 'Silva', fechaNacimiento: '1992-02-23', estatura: 1.85, peso: 84, club: 'Manchester United', posicion: 'Mediocampista' },
      { nombre: 'Bruno', apellido: 'Guimarães', fechaNacimiento: '1997-11-16', estatura: 1.82, peso: 74, club: 'Newcastle United', posicion: 'Mediocampista' },
      { nombre: 'Lucas', apellido: 'Paquetá', fechaNacimiento: '1997-08-27', estatura: 1.8, peso: 72, club: 'West Ham United', posicion: 'Mediocampista' },
      { nombre: 'Douglas', apellido: 'Luiz', fechaNacimiento: '1998-05-09', estatura: 1.77, peso: 66, club: 'Juventus FC', posicion: 'Mediocampista' },
      { nombre: 'João', apellido: 'Gomes', fechaNacimiento: '2001-02-12', estatura: 1.76, peso: 74, club: 'Wolverhampton', posicion: 'Mediocampista' },
      { nombre: 'Raphinha', apellido: 'Belloli', fechaNacimiento: '1996-12-14', estatura: 1.76, peso: 68, club: 'FC Barcelona', posicion: 'Delantero' },
      { nombre: 'Vinícius', apellido: 'Júnior', fechaNacimiento: '2000-07-12', estatura: 1.76, peso: 73, club: 'Real Madrid', posicion: 'Delantero' },
      { nombre: 'Rodrygo', apellido: 'Silva', fechaNacimiento: '2001-01-09', estatura: 1.74, peso: 64, club: 'Real Madrid', posicion: 'Delantero' },
      { nombre: 'Gabriel', apellido: 'Martinelli', fechaNacimiento: '2001-06-18', estatura: 1.78, peso: 75, club: 'Arsenal FC', posicion: 'Delantero' },
      { nombre: 'Richarlison', apellido: 'de Andrade', fechaNacimiento: '1997-05-10', estatura: 1.84, peso: 83, club: 'Tottenham Hotspur', posicion: 'Delantero' },
      { nombre: 'Endrick', apellido: 'Felipe', fechaNacimiento: '2006-07-21', estatura: 1.73, peso: 70, club: 'Real Madrid', posicion: 'Delantero' },
      { nombre: 'Sávio', apellido: 'Moreira', fechaNacimiento: '2004-04-10', estatura: 1.76, peso: 66, club: 'Manchester City', posicion: 'Delantero' },
      { nombre: 'Ederson', apellido: 'Moraes', fechaNacimiento: '1993-08-17', estatura: 1.88, peso: 86, club: 'Manchester City', posicion: 'Arquero' },
      { nombre: 'Fabinho', apellido: 'Tavares', fechaNacimiento: '1993-10-23', estatura: 1.88, peso: 78, club: 'Al-Ittihad', posicion: 'Mediocampista' },
      { nombre: 'Bremer', apellido: 'Silva', fechaNacimiento: '1997-03-18', estatura: 1.88, peso: 84, club: 'Juventus FC', posicion: 'Defensor' },
      { nombre: 'André', apellido: 'Trindade', fechaNacimiento: '2001-07-16', estatura: 1.76, peso: 72, club: 'Wolverhampton', posicion: 'Mediocampista' },
      { nombre: 'Estêvão', apellido: 'Willian', fechaNacimiento: '2007-04-21', estatura: 1.73, peso: 68, club: 'Chelsea FC', posicion: 'Delantero' },
      { nombre: 'Malcom', apellido: 'Silva', fechaNacimiento: '1997-02-26', estatura: 1.71, peso: 65, club: 'Al-Hilal', posicion: 'Delantero' },
      { nombre: 'Evanilson', apellido: 'Barbosa', fechaNacimiento: '1999-02-06', estatura: 1.83, peso: 79, club: 'AFC Bournemouth', posicion: 'Delantero' },
      { nombre: 'Bento', apellido: 'Matheus', fechaNacimiento: '1999-03-10', estatura: 1.92, peso: 88, club: 'Al-Nassr FC', posicion: 'Arquero' },
      { nombre: 'Guilherme', apellido: 'Arana', fechaNacimiento: '1997-04-14', estatura: 1.76, peso: 72, club: 'Atlético Mineiro', posicion: 'Defensor' },
    ],
  },
];

async function createJugador(Jugador, posicionMap, figuritaId, player, posicionOverride) {
  await Jugador.create({
    nombre: player.nombre,
    apellido: player.apellido,
    estatura: player.estatura,
    peso: player.peso,
    club: player.club,
    fechaNacimiento: player.fechaNacimiento,
    idFigurita: figuritaId,
    idPosicion: posicionMap[posicionOverride ?? player.posicion],
  });
}

export async function seedDatabase(models) {
  const { Posicion, Seleccion, Figurita, Jugador, FigEspeciales, Usuario, UsuarioFigurita } =
    models;

  await Posicion.bulkCreate(posiciones.map((nombre) => ({ nombre })));

  const posicionRows = await Posicion.findAll();
  const posicionMap = Object.fromEntries(posicionRows.map((p) => [p.nombre, p.idPosicion]));

  const usuario = await Usuario.create({
    codigo: 'demo',
    nombre: 'Usuario Demo',
  });

  for (const team of seleccionesData) {
    if (team.plantel.length !== 26) {
      throw new Error(`La selección ${team.codigo} debe tener exactamente 26 jugadores`);
    }

    const seleccion = await Seleccion.create({
      codigo: team.codigo,
      nombre: team.nombre,
      asociacion: team.asociacion,
      flagUrl: team.flagUrl,
      nroDesde: team.nroDesde,
      nroHasta: team.nroHasta,
      colorMain: team.colorMain,
      colorAccent1: team.colorAccent1,
      colorAccent2: team.colorAccent2,
      colorText: team.colorText,
    });

    for (let nro = 1; nro <= 29; nro += 1) {
      let tipo = 'jugador';
      let path = photoUrl(team.seed, nro);

      if (nro === 1) {
        tipo = 'escudo';
        path = team.flagUrl;
      } else if (nro === 2) {
        tipo = 'foto_equipo';
        path = teamPhotoUrl(team.seed);
      } else if (nro === 3) {
        tipo = 'tecnico';
        path = photoUrl(team.seed, 'tecnico');
      }

      const figurita = await Figurita.create({
        nroFigurita: nro,
        pathTopic: path,
        tipo,
        idSeleccion: seleccion.idSeleccion,
      });

      if (nro === 1) {
        await FigEspeciales.create({ nombre: 'Escudo', idFigurita: figurita.idFigurita });
      } else if (nro === 2) {
        await FigEspeciales.create({ nombre: 'Foto selección', idFigurita: figurita.idFigurita });
      } else if (nro === 3) {
        await createJugador(Jugador, posicionMap, figurita.idFigurita, team.tecnico, 'Técnico');
      } else {
        const player = team.plantel[nro - 4];
        await createJugador(Jugador, posicionMap, figurita.idFigurita, player);
      }

      if (team.owned.includes(nro)) {
        await UsuarioFigurita.create({
          idUsuario: usuario.idUsuario,
          idFigurita: figurita.idFigurita,
        });
      }
    }
  }
}
