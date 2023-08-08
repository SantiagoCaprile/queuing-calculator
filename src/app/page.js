"use client";
import { useState } from "react";

const modelInitialState = {
  lambda: { value: 0, unit: "horas" },
  servers: 1,
  poisson: true,
  selection: false,
  maxLength: 0,
  sameSpeed: true,
  deviation: { value: 0, unit: "horas" },
  serversSpeed: [
    { value: 0, unit: "horas" },
    { value: 0, unit: "horas" },
  ],
  results: [
    { param: "Ls", value: 0, unit: "clientes" },
    { param: "Lq", value: 0, unit: "clientes" },
    { param: "Ws", value: 0, unit: "horas" },
    { param: "Wq", value: 0, unit: "horas" },
    { param: "ρ", value: 0, unit: "" },
    { param: "P0", value: 0, unit: "%" },
  ],
};

export default function Home() {
  const [model, setModel] = useState(modelInitialState);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold text-center">
        Calculadora online de sistemas de colas {model.sameSpeed}
      </h1>
      <div className="flex flex-col mt-8 justify-evenly bg-slate-600">
        <div className="question bg-white text-black min-w-[400px] flex justify-between p-4 rounded-md mb-2">
          <div className="question__title">
            <h2>¿Cuantos servidores tiene el sistema?</h2>
          </div>
          <select
            className="question__select text-center form-select"
            onChange={(e) => setModel({ ...model, servers: e.target.value })}
          >
            <option defaultValue value={1}>
              1
            </option>
            <option value={2}>2</option>
          </select>
        </div>
        <div className="question bg-white text-black min-w-[400px] flex justify-between p-4 rounded-md mb-2">
          <div className="question__title">
            <h2>¿Tiene tiempos de arribo de tipo Poisson?</h2>
          </div>
          <div
            className="flex min-w-[100px] justify-between align-middle text-center"
            onChange={(e) =>
              setModel({ ...model, poisson: e.target.value === "true" })
            }
          >
            <fieldset className="flex justify-evenly">
              <input
                type="radio"
                defaultChecked
                value={true}
                name="poisson"
                className="mr-2"
              />
              <label>SI</label>
            </fieldset>
            <fieldset className="flex justify-evenly">
              <input
                type="radio"
                value={false}
                name="poisson"
                className="mr-2"
              />
              <label>NO</label>
            </fieldset>
          </div>
        </div>
        {model.servers === 1 && !model.poisson && (
          <div className="question bg-white text-black min-w-[400px] flex justify-stretch p-3 rounded-md mb-2">
            <div className="question__title">
              <label>¿Cual es su desviación estandar?</label>
            </div>
            <div className="flex justify-end items-center w-full">
              <input
                type="number"
                placeholder="Desviacion Estándar"
                className="border-2 border-black rounded-md p-2 mb-1 text-center"
                min={0}
                defaultValue={0}
                onChange={(e) => {
                  const deviation = e.target.value;
                  setModel({
                    ...model,
                    deviation: { ...model.deviation, value: deviation },
                  });
                }}
              />
              <select
                onChange={(e) => {
                  const deviation = { ...model.deviation };
                  deviation.unit = e.target.value;
                  setModel({ ...model, deviation });
                }}
              >
                <option value="horas"> hora</option>
                <option value="minutos"> min</option>
                <option value="segundos"> seg</option>
              </select>
              <p className="ml-2">/clientes</p>
            </div>
          </div>
        )}
        {model.servers === 1 && model.poisson && (
          <div className="question bg-white text-black min-w-[400px] flex justify-stretch p-3 rounded-md mb-2">
            <div className="question__title">
              <label>
                ¿Con bloqueo? Nro maximo de clientes en el sistema, sino deje 0
              </label>
            </div>
            <div className="flex justify-end items-center w-full">
              <input
                type="number"
                placeholder="Maximo de clientes"
                className="border-2 border-black rounded-md p-2 mb-1 text-center"
                min={0}
                defaultValue={0}
                onChange={(e) => {
                  const maxLength = e.target.value;
                  setModel({ ...model, maxLength });
                }}
              />
            </div>
          </div>
        )}
        {model.servers > 1 && (
          <div className="question bg-white text-black min-w-[400px] flex justify-between p-4 rounded-md mb-2">
            <div className="question__title">
              <h2>¿Tienen la misma velocidad?</h2>
            </div>
            <div
              className="flex min-w-[100px] justify-between align-middle text-center"
              onChange={(e) =>
                setModel({ ...model, sameSpeed: e.target.value === "true" })
              }
            >
              <fieldset className="flex justify-evenly">
                <input
                  type="radio"
                  defaultChecked
                  value={true}
                  name="sameSpeed"
                  className="mr-2"
                />
                <label>SI</label>
              </fieldset>
              <fieldset className="flex justify-evenly">
                <input
                  type="radio"
                  value={false}
                  name="sameSpeed"
                  className="mr-2"
                />
                <label>NO</label>
              </fieldset>
            </div>
          </div>
        )}
        {model.servers > 1 && model.sameSpeed === false && (
          <div className="question bg-white text-black min-w-[400px] flex justify-between p-4 rounded-md mb-2">
            <div className="question__title">
              <h2>¿El sistema tiene seleccion de servidor?</h2>
            </div>
            <div
              className="flex min-w-[100px] justify-between align-middle text-center"
              onChange={(e) =>
                setModel({ ...model, selection: e.target.value === "true" })
              }
            >
              <fieldset className="flex justify-evenly">
                <input
                  type="radio"
                  value={true}
                  name="selection"
                  className="mr-2"
                />
                <label>SI</label>
              </fieldset>
              <fieldset className="flex justify-evenly">
                <input
                  type="radio"
                  defaultChecked
                  value={false}
                  name="selection"
                  className="mr-2"
                />
                <label>NO</label>
              </fieldset>
            </div>
          </div>
        )}
        <div className="question bg-white text-black min-w-[400px] flex flex-col  justify-between p-4 rounded-md mb-2">
          <div className="question__title">
            <h2>¿Cual es la velocidad de servicio? (µ)</h2>
          </div>
          <div className="question__select flex flex-col">
            {!model.sameSpeed ? (
              Array.from({ length: model.servers }).map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center w-full"
                >
                  <input
                    placeholder={"Servidor " + (index + 1)}
                    type="number"
                    min={0}
                    className="border-2 border-black rounded-md p-2 mb-1 text-center"
                    onChange={(e) => {
                      const serversSpeed = [...model.serversSpeed];
                      serversSpeed[index].value = e.target.value;
                      setModel({ ...model, serversSpeed });
                    }}
                  />
                  <p className="ml-2">clientes</p>
                  <select
                    onChange={(e) => {
                      const serversSpeed = [...model.serversSpeed];
                      serversSpeed[index].unit = e.target.value;
                      setModel({ ...model, serversSpeed });
                    }}
                  >
                    <option value="horas"> por hora</option>
                    <option value="minutos"> por min</option>
                    <option value="segundos"> por seg</option>
                  </select>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-center w-full">
                <input
                  placeholder={"Servidor "}
                  type="number"
                  min={0}
                  className="border-2 border-black rounded-md p-2 mb-1 text-center"
                  onChange={(e) => {
                    const serversSpeed = [...model.serversSpeed];
                    serversSpeed[0].value = e.target.value;
                    setModel({ ...model, serversSpeed });
                  }}
                />
                <p className="ml-2">clientes</p>
                <select
                  onChange={(e) => {
                    const serversSpeed = [...model.serversSpeed];
                    serversSpeed[0].unit = e.target.value;
                    setModel({ ...model, serversSpeed });
                  }}
                >
                  <option value="horas"> por hora</option>
                  <option value="minutos"> por min</option>
                  <option value="segundos"> por seg</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="question bg-white text-black min-w-[400px] flex flex-col justify-between p-4 rounded-md mb-2">
          <div className="question__title">
            <h2>¿Cual es la tasa de llegada? (λ)</h2>
            <div className="flex justify-between items-center w-full">
              <input
                type="number"
                placeholder="Tasa de llegada"
                className="border-2 border-black rounded-md p-2 mb-1 text-center"
                min={0}
                onChange={(e) => {
                  const lambda = e.target.value;
                  setModel({
                    ...model,
                    lambda: { ...model.lambda, value: lambda },
                  });
                }}
              />
              <p className="ml-2">clientes</p>
              <select
                onChange={(e) => {
                  const lambda = { ...model.lambda };
                  lambda.unit = e.target.value;
                  setModel({ ...model, lambda });
                }}
              >
                <option value="horas"> por hora</option>
                <option value="minutos"> por min</option>
                <option value="segundos"> por seg</option>
              </select>
            </div>
          </div>
          <div
            className="flex min-w-[100px] justify-between align-middle text-center"
            onChange={(e) =>
              setModel({ ...model, sameSpeed: e.target.value === "true" })
            }
          ></div>
        </div>

        <button
          className="bg-green-300 text-black p-2 rounded-md hover:translate-y-[-3px] hover:bg-green-500 transition-all duration-100 ease-in-out"
          onClick={() =>
            setModel({ ...model, results: calculateResults(model) })
          }
        >
          Actualizar Resultados
        </button>
        <button
          className="bg-green-200 mt-1 text-black p-2 rounded-md hover:translate-y-[-3px] hover:bg-green-500 transition-all duration-100 ease-in-out"
          onClick={() => setModel(modelInitialState)}
        >
          Reiniciar
        </button>
        <div className="flex flex-col justify-between bg-lime-300 text-black min-w-[500px] p-10 mt-4 rounded-md">
          <h2 className="text-xl font-bold text-center mb-3 underline">
            Resultados
          </h2>

          {model.results.length > 0 ? (
            <>
              <Resultados results={model.results} />
              <div className="flex w-full text-xl p-1 justify-center mt-1">
                <button
                  className="bg-slate-400 text-black p-2 hover:translate-y-[-3px] hover:bg-green-500 transition-all duration-100 ease-in-out rounded-s"
                  onClick={() =>
                    setModel({
                      ...model,
                      results: resultsConversion(model.results, "horas"),
                    })
                  }
                >
                  En horas
                </button>
                <button
                  className="bg-slate-400 text-black p-2 hover:translate-y-[-3px] hover:bg-green-500 transition-all duration-100 ease-in-out"
                  onClick={() =>
                    setModel({
                      ...model,
                      results: resultsConversion(model.results, "minutos"),
                    })
                  }
                >
                  En minutos
                </button>
                <button
                  className="bg-slate-400 text-black p-2 hover:translate-y-[-3px] hover:bg-green-500 transition-all duration-100 ease-in-out rounded-e"
                  onClick={() =>
                    setModel({
                      ...model,
                      results: resultsConversion(model.results, "segundos"),
                    })
                  }
                >
                  En segundos
                </button>
              </div>
            </>
          ) : (
            <div>
              <p className="text-xl font-bold text-center text-red-500">
                El sistema es inestable.
              </p>
              <p className="text-center text-red-500">
                La tasa de llegada es mayor o igual a la tasa de servicio
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const Resultados = ({ results }) => {
  return (
    <>
      {results.map((result) => (
        <div className="flex w-full text-xl p-1" key={result.param}>
          <div className="flex flex-col w-2/3 items-center">
            <p>{result.param}</p>
          </div>
          <div className="flex flex-col w-1/3 items-left">
            <p>
              {result.value}
              <span className="pl-2">{result.unit}</span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

const calculateResults = (model) => {
  const {
    lambda,
    serversSpeed,
    servers,
    sameSpeed,
    selection,
    maxLength,
    deviation,
  } = model;
  const results = [];
  //Acondiciona todo a la misma unidad de tiempo
  let mu = 0;
  let lambdaHours = unitConversion(
    parseFloat(lambda.value),
    lambda.unit,
    "horas"
  );

  let deviationHours;
  deviation.value != 0
    ? (deviationHours = unitConversion2(
        parseFloat(deviation.value),
        deviation.unit,
        "horas"
      ))
    : (deviationHours = 0);

  serversSpeed.forEach((speed) => {
    mu += unitConversion(parseFloat(speed.value), speed.unit, "horas");
  });
  sameSpeed ? (mu *= servers) : (mu = mu);
  // Verificar que el sistema sea estable
  if (maxLength === 0 && lambda.value >= mu) {
    console.warn(
      "El sistema es inestable. La tasa de llegada es mayor o igual a la tasa de servicio por servidor."
    );
    return results;
  }
  // Calcular los parámetros y métricas según el tipo de sistema de colas
  if (!model.poisson) {
    // MG1 o MD1
    return fixedResults(calculateMG1(lambdaHours, mu, deviationHours));
  }

  if (servers === 1) {
    if (maxLength > 0) {
      // MM1K
      return fixedResults(calculateMM1K(lambdaHours, mu, maxLength));
    } else {
      // MM1 (un servidor)
      return fixedResults(calculateMM1(lambdaHours, mu));
    }
  } else {
    // MM2
    if (sameSpeed) {
      return fixedResults(calculateMMCSameSpeed(lambdaHours, mu, servers));
    } else {
      return fixedResults(
        calculateMMCDifSpeed(lambdaHours, serversSpeed, selection)
      );
    }
  }
};

const fixedResults = (results) =>
  results.map((result) => {
    result.value = Math.round(result.value * 1000) / 1000;
    return result;
  });

const calculateMM1 = (lambda, mu) => {
  alert("calculando MM1");
  const results = [];

  const rhoValue = lambda / mu;
  const lsValue = lambda / (mu - lambda);
  const lqValue = Math.pow(lambda, 2) / (mu * (mu - lambda));
  const wsValue = 1 / (mu - lambda);
  const wqValue = lambda / (mu * (mu - lambda));
  const p0Value = (1 - lambda / mu) * 100;

  results.push({ param: "Ls", value: lsValue, unit: "clientes" });
  results.push({ param: "Lq", value: lqValue, unit: "clientes" });
  results.push({ param: "Ws", value: wsValue, unit: "horas" });
  results.push({ param: "Wq", value: wqValue, unit: "horas" });
  results.push({ param: "ρ", value: rhoValue, unit: "" });
  results.push({ param: "P0", value: p0Value, unit: "%" });

  return results;
};

const calculateMMCSameSpeed = (lambda, mu, servers) => {
  alert("calculando MMCsameSpeed");
  const results = [];
  lambda = parseFloat(lambda);
  servers = parseInt(servers);

  const rhoValue = lambda / mu;
  const lsValue = rhoValue / (1 - rhoValue);
  const lqValue = Math.pow(rhoValue, servers) / (1 - rhoValue);
  const wsValue = lsValue / lambda;
  const wqValue = lqValue / lambda;
  const p0Value = (1 - rhoValue) * 100;

  results.push({ param: "Ls", value: lsValue, unit: "clientes" });
  results.push({ param: "Lq", value: lqValue, unit: "clientes" });
  results.push({ param: "Ws", value: wsValue, unit: "horas" });
  results.push({ param: "Wq", value: wqValue, unit: "horas" });
  results.push({ param: "ρ", value: rhoValue, unit: "" });
  results.push({ param: "P0", value: p0Value, unit: "%" });

  return results;
};

const calculateMMCDifSpeed = (lambda, serversSpeed, selection) => {
  const results = [];
  let mu = 0;
  serversSpeed.forEach((speed) => {
    mu += unitConversion(parseFloat(speed.value), speed.unit, "horas");
  });

  serversSpeed.sort((a, b) => a.value - b.value);
  const slowerServer = serversSpeed[0].value;
  const fasterServer = serversSpeed[1].value;
  let p0Value, lsValue, lqValue, wsValue, wqValue, rhoValue;
  if (!selection) {
    //sin seleccion
    alert("calculando MMCDifSpeed sin seleccion");
    const r = slowerServer / fasterServer;
    rhoValue = 1 - (r * (1 + r)) / (1 + Math.pow(r, 2)); // rho critico
    const a = (2 * fasterServer * slowerServer) / (fasterServer + slowerServer);
    p0Value = ((1 - rhoValue) * 100) / (1 - rhoValue + lambda / a);
    lsValue = lambda / ((1 - rhoValue) * (lambda + (1 - rhoValue) * a));

    lqValue = Math.pow(rhoValue, 2) / p0Value;
    wsValue = lsValue / lambda;
    wqValue = lqValue / lambda;
  } else {
    //con seleccion
    alert("calculando MMCDifSpeed con seleccion");
    const r = slowerServer / fasterServer;
    const [x1, x2] = quadraticFormula(r);
    rhoValue = x1 < x2 ? x1 : x2;
    const a =
      ((2 * lambda + mu) * (fasterServer * slowerServer)) /
      (mu * (lambda + slowerServer));
    p0Value = ((1 - rhoValue) * 100) / (1 - rhoValue + lambda / a);
    lsValue = lambda / ((1 - rhoValue) * (lambda + (1 - rhoValue) * a));
    lqValue = Math.pow(rhoValue, 2) / p0Value;
    wsValue = lsValue / lambda;
    wqValue = lqValue / lambda;
  }

  results.push({ param: "Ls", value: lsValue, unit: "clientes" });
  results.push({ param: "Lq", value: lqValue, unit: "clientes" });
  results.push({ param: "Ws", value: wsValue, unit: "horas" });
  results.push({ param: "Wq", value: wqValue, unit: "horas" });
  results.push({ param: "ρc", value: rhoValue, unit: "" });
  results.push({ param: "P0", value: p0Value, unit: "%" });

  return results;
};

// ρc = Pc^2(1 + r^2) − Pc(2 + r^2) + (2r − 1) * (1 + r) = 0

const quadraticFormula = (r) => {
  const a = 1 + Math.pow(r, 2);
  const b = -(2 + Math.pow(r, 2));
  const c = (2 * r - 1) * (1 + r);
  const disc = Math.pow(b, 2) - 4 * a * c;
  const x1 = (-b + Math.sqrt(disc)) / (2 * a);
  const x2 = (-b - Math.sqrt(disc)) / (2 * a);
  return [x1, x2];
};

const calculateMM1K = (lambda, mu, maxLength) => {
  alert("calculando MM1K");
  const results = [];
  let rhoValue = lambda / mu;

  let powPPlus1 = Math.pow(rhoValue, maxLength + 1);
  let powP = Math.pow(rhoValue, maxLength);
  let p0Value = ((1 - rhoValue) * 100) / (1 - powPPlus1);
  let Pb = (powP * (1 - rhoValue)) / (1 - powPPlus1);
  let lambdaEfective = lambda * (1 - Pb);
  let lsValue =
    rhoValue / (1 - rhoValue) - ((maxLength - 1) * powPPlus1) / (1 - powPPlus1);
  let lqValue = lsValue - ((1 - powP) * rhoValue) / (1 - powPPlus1);
  let wqValue = lqValue / lambdaEfective;
  let wsValue = wqValue + 1 / mu;

  results.push({ param: "Ls", value: lsValue, unit: "clientes" });
  results.push({ param: "Lq", value: lqValue, unit: "clientes" });
  results.push({ param: "Ws", value: wsValue, unit: "horas" });
  results.push({ param: "Wq", value: wqValue, unit: "horas" });
  results.push({ param: "ρ", value: rhoValue, unit: "" });
  results.push({ param: "P0", value: p0Value, unit: "%" });

  return results;
};

const calculateMG1 = (lambda, mu, deviation) => {
  alert("calculando MG1");
  const results = [];
  let rhoValue = lambda / mu;
  let p0Value = 1 - rhoValue;
  let lqValue =
    (Math.pow(lambda, 2) * Math.pow(deviation, 2) + Math.pow(rhoValue, 2)) /
    (2 * p0Value);
  let lsValue = rhoValue + lqValue;
  let wqValue = lqValue / lambda;
  let wsValue = wqValue + deviation;
  p0Value *= 100;

  results.push({ param: "Ls", value: lsValue, unit: "clientes" });
  results.push({ param: "Lq", value: lqValue, unit: "clientes" });
  results.push({ param: "Ws", value: wsValue, unit: "horas" });
  results.push({ param: "Wq", value: wqValue, unit: "horas" });
  results.push({ param: "ρ", value: rhoValue, unit: "" });
  results.push({ param: "P0", value: p0Value, unit: "%" });

  return results;
};

const resultsConversion = (results, unit) => {
  const ws = results.find((result) => result.param === "Ws");
  const wq = results.find((result) => result.param === "Wq");
  ws.value = unitConversion2(ws.value, ws.unit, unit);
  ws.value = Math.round(ws.value * 1000) / 1000;
  ws.unit = unit;
  wq.value = unitConversion2(wq.value, wq.unit, unit);
  wq.value = Math.round(wq.value * 1000) / 1000;
  wq.unit = unit;
  return results;
};

const unitConversion = (value, unitOrigin, unitDestiny) => {
  switch (unitOrigin) {
    case "horas":
      switch (unitDestiny) {
        case "horas":
          return value;
        case "minutos":
          return value / 60;
        case "segundos":
          return value / 3600;
        default:
          return value;
      }
    case "minutos":
      switch (unitDestiny) {
        case "horas":
          return value * 60;
        case "minutos":
          return value;
        case "segundos":
          return value / 60;
        default:
          return value;
      }
    case "segundos":
      switch (unitDestiny) {
        case "horas":
          return value * 3600;
        case "minutos":
          return value * 60;
        case "segundos":
          return value;
        default:
          return value;
      }
    default:
      return value;
  }
};

const unitConversion2 = (value, unitOrigin, unitDestiny) => {
  switch (unitOrigin) {
    case "horas":
      switch (unitDestiny) {
        case "horas":
          return value;
        case "minutos":
          return value * 60;
        case "segundos":
          return value * 3600;
        default:
          return value;
      }
    case "minutos":
      switch (unitDestiny) {
        case "horas":
          return value / 60;
        case "minutos":
          return value;
        case "segundos":
          return value * 60;
        default:
          return value;
      }
    case "segundos":
      switch (unitDestiny) {
        case "horas":
          return value / 3600;
        case "minutos":
          return value / 60;
        case "segundos":
          return value;
        default:
          return value;
      }
    default:
      return value;
  }
};
