app.service('wstExplorerFilterPromptModal', ['$uibModal', function($uibModal) {

      var modalDefaults = {
          backdrop: true,
          keyboard: true,
          modalFade: true,
          templateUrl: 'wst-explorer-modal/directives/views/explorerFilterPromptModal.html'
      };

      var modalOptions = {
          closeButtonText: 'Close',
          actionButtonText: 'OK',
          headerText: 'Proceed?',
          bodyText: 'Perform this action?'
      };

      this.showModal = function (customModalDefaults, customModalOptions) {
          if (!customModalDefaults) customModalDefaults = {};
          customModalDefaults.backdrop = 'static';
          return this.show( customModalDefaults, customModalOptions);
      };

      this.show = function (customModalDefaults, customModalOptions) {
          //Create temp objects to work with since we're in a singleton service

          //Create temp objects to work with since we're in a singleton service

          var tempModalDefaults = {};
          var tempModalOptions = {};

          //Map angular-ui modal custom defaults to modal defaults defined in service
          angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

          //Map modal.html $scope custom properties to defaults defined in service
          angular.extend(tempModalOptions, modalOptions, customModalOptions);

          if (!tempModalDefaults.controller) {
              tempModalDefaults.controller = function ($scope, $uibModalInstance,$rootScope, $i18next,$ocLazyLoad,$compile,queryModel,reportModel,$timeout) {

                  $scope.modalOptions = tempModalOptions;

                  if ($scope.modalOptions.filter)
                      $scope.selectedFilter = $scope.modalOptions.filter;


                  $scope.setFilterPrompt = function()
                  {
                      $('#filterPromptsModal').modal('hide');
                      if ($scope.selectedFilter.filterPrompt == true)
                          $scope.selectedFilter.filterPrompt = false;
                      else
                          $scope.selectedFilter.filterPrompt = true;

                      $scope.modalOptions.ok();
                  }



                  $scope.readonly = $scope.modalOptions.readonly;

                  $scope.modalOptions.ok = function (result) {
                          $uibModalInstance.close($scope.report);

                  };


                  $scope.modalOptions.close = function (result) {
                      $uibModalInstance.dismiss('cancel');
                  };



              }
          }
          return $uibModal.open(tempModalDefaults).result;
          }
  }]);
