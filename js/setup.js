'use strict';

(() => {
  let sourceData = [];

  const onSuccessLoadData = (serverData) => {
    window.sourceData = serverData;
    window.customize.sortWizardsData(window.sourceData);
  };

  const onFailedRequest = (errorMessage) => {
    window.util.showErrorMessage(errorMessage);
  };

  window.backend.download(onSuccessLoadData, onFailedRequest);

  window.setup = {
    onFailedRequest
  };

})();
