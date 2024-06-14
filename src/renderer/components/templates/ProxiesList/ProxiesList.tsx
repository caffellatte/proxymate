const ProxiesList = () => {
  window.electronAPI.proxyList().then((data) => {
    console.log(data);
  });

  return <div>test</div>;
};

export default ProxiesList;
