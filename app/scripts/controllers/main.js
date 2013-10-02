App.controller('MainController', ['$scope',function ($scope) {
   $scope.steps = [
      {
         name : "About you",
         completed : false,
         active : true,
         visible : true,
         data : null,
         validateFunction : isValideStep1,
         error : false
      },
      {
         name : "About your partner",
         completed : false,
         active : false,
         visible : false,
         data : null,
         validateFunction : isValidPerson,
         error : false
      },
      {
         name : "Settings",
         completed : false,
         active : false,
         visible : true,
         data : null,
         validateFunction : isValidStep2,
         error : false
      },
      {
         name : "Result",
         completed : false,
         active : false,
         visible : true,
         data : null,
         validateFunction : isValidDefault,
         error : false
      }
   ];

   $scope.submit = function(stepData) {

      function goToNextStep () {
         var item = _.findWhere($scope.steps, {visible: true, completed : false});
         if (item) {
            item.active = true;
         }
      };


      function saveData(stepData) {
         var activeStep = _.findWhere($scope.steps, {visible : true, active : true});

         if (activeStep && activeStep.hasOwnProperty('validateFunction') && activeStep.validateFunction(stepData)) {
            activeStep.data = stepData;
            activeStep.completed = true;
            activeStep.active = false;
            return true;
         }

         return false;
      };

      if (saveData(stepData)) {
         goToNextStep();
      }

   };


   function isValidPerson(stepData) {
      $scope.steps[1].error = false;

      var isValid = false;
      if (!(stepData.hasOwnProperty('gender') && stepData.gender)) {
         $scope.steps[1].error = true;
      }

      if(!(stepData.hasOwnProperty('tobacco') && stepData.tobacco)) {
         $scope.steps[1].error = true;
      }

      return !$scope.steps[1].error;
   };

   function isValideStep1 (stepData) {
      $scope.steps[0].error = false;

      if (!isValidPerson(stepData)) {
         $scope.steps[0].error = true;
         $scope.steps[1].error = false;
      }

      if(!(stepData.hasOwnProperty('isPartner') && stepData.isPartner != null)) {
         $scope.steps[0].error = true;
      }


      if (stepData.hasOwnProperty('isPartner') && stepData.isPartner == '1') {
         $scope.steps[1].visible = true;
      }
      else {
         $scope.steps[1].visible = false;
      }
      return !$scope.steps[0].error;

   };

   function isValidStep2(stepData) {
      $scope.steps[2].error = false;

      if(!(stepData.hasOwnProperty('coverAmount') && (stepData.coverAmount > 40000 && stepData.coverAmount < 750000) )) {
         $scope.steps[2].error = true;
      }

      if(!(stepData.hasOwnProperty('coverTerm') && (stepData.coverTerm > 5 && stepData.coverTerm < 40) )) {
         $scope.steps[2].error = true;
      }

      if(!(stepData.hasOwnProperty('coverType') && stepData.coverType)) {
         $scope.steps[2].error = true;
      }

      if(!(stepData.hasOwnProperty('illnes') && stepData.illnes)) {
         $scope.steps[2].error = true;
      }
      else if (stepData.hasOwnProperty('illnes') && stepData.illnes == "yes" ){
         if (!(stepData.hasOwnProperty('illnesAmount') && stepData.illnesAmount)) {
            $scope.steps[2].error = true;
         }
      }

      return !$scope.steps[2].error;
   };

   function isValidDefault(stepData) {
      return true;
   };

   $scope.goToStep = function(step) {
      _.each($scope.steps, function(step) {
         step.active = false;
      });

      step.active = true;
      console.log("change step");
   };

}]);
