import { readFileSync } from "fs";

const developmentServers = JSON.parse(readFileSync("./data/development-servers.json").toString());

const publicServers = JSON.parse(readFileSync("./data/public-servers.json").toString());

function validateServer(server) {
  // check if everyting is present
  if (!server.name) throw new Error("'name' field is missing");
  if (!server.version) throw new Error("'version' field is missing");
  if (!server.server) throw new Error("'server' field is missing");
  if (!server.client) throw new Error("'client' field is missing");
  if (!server.description) throw new Error("'description' field is missing");
  if (!server.maintainer) throw new Error("'maintainer' object is missing");
  if (!server.maintainer.name) throw new Error("'maintainer.name' field is missing");
  if (!server.maintainer.contact) throw new Error("'maintainer.contact' field is missing");
  if (!server.maintainer.repository) throw new Error("'maintainer.repository' field is missing");
  if (!server.region) throw new Error("'region' object is missing");
  if (!server.region.continent) throw new Error("'region.continent' field is missing");
  if (!server.region.country) throw new Error("'region.country' field is missing");

  // check if everything has the correct type
  if (typeof server.name !== "string") throw new Error("'name' must be a string");
  if (typeof server.version !== "string") throw new Error("'version' must be a string");
  if (typeof server.server !== "string") throw new Error("'server' must be a string");
  if (typeof server.client !== "string") throw new Error("'client' must be a string");
  if (typeof server.description !== "string") throw new Error("'description' must be a string");
  if (typeof server.maintainer !== "object") throw new Error("'maintainer' must be an object");
  if (typeof server.maintainer.name !== "string") throw new Error("'maintainer.name' must be a string");
  if (typeof server.maintainer.contact !== "string") throw new Error("'maintainer.contact' must be a string");
  if (typeof server.maintainer.repository !== "string") throw new Error("'maintainer.repository' must be a string");
  if (typeof server.region !== "object") throw new Error("'region' must be an object");
  if (typeof server.region.continent !== "string") throw new Error("'region.continent' must be a string");
  if (typeof server.region.country !== "string") throw new Error("'region.country' must be a string");

  // check if server version is a valid regex: \d\.\d\.\d
  if (!/^\d\.\d\.\d$/.test(server.version))
    throw new Error("version must be a valid semver version. Look at https://semver.org/ for more information");

  // url checks
  if (!server.server.startsWith("ws://") && !server.server.startsWith("wss://"))
    throw new Error("'server' must be a websocket url");
  if (!server.client.startsWith("http://") && !server.client.startsWith("https://"))
    throw new Error("'client' must be a valid http url");
  if (!server.maintainer.repository.startsWith("http://") && !server.maintainer.repository.startsWith("https://"))
    throw new Error("'maintainer.repository' must be a valid http url");
}

function validateServers(servers) {
  for (const server of servers) {
    validateServer(server);
  }
}

validateServers(developmentServers);
validateServers(publicServers);

console.log("All servers are valid");
