import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  rulesUrl: `${defaultUrl}:9008`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.Rules.CreateRule({ name: "<ruleName>" }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.Rules.ListRules({ offset: 0, limit: 10 }, domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.Rules.ViewRule("<ruleId>", domainId, token)
  .then((response: any) => {
    console.log(response);
  })
  .catch((error: any) => {
    console.error(error);
  });

mySdk.Rules.UpdateRule(
  {
    id: "<ruleId>",
    name: "<updatedName>",
    logic: { type: 1, value: "<value>" },
  },
  domainId,
  token
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.Rules.DeleteRule("<ruleId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.Rules.DisableRule("<ruleId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.Rules.EnableRule("<ruleId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
