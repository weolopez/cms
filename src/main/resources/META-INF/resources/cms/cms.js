
var wikiName='test';
    
async function getDocument(name) {
  let response = await fetch(`/cms/v1/cms/${name}`);
  let data = await response.json();

  let cms = document.getElementsByTagName('cms')[0];

  if (!data) { cms.innerHTML = `<div>New HTML</div>`}
  else if (data.body) {  cms.innerHTML = data.body;  }

  return data;
}
async function setDocument() {
  let cms = document.getElementsByTagName("cms")[0].innerHTML;
  doc.body = cms.toString().replace(/\"/g, '\\\"');
  console.log(doc.body);

  const options = {
    method: "PUT",
    body: JSON.stringify(doc),
    headers: {
      "Content-Type": "application/text"
    }
  };

  // send POST request

  let response = await fetch(`/cms/v1/cms/${wikiName}`, options)
    .then(res => res.json())
    .then(res => console.log(res));

  let data = await response;

  return data;
}

