import { cloneDeep } from 'lodash';
import {
  MacroInputModel,
  renderMacro,
} from '@server/unit-tests/general/testHelper';
import { risk } from '@server/unit-tests/products/car/wip.json';
import { Risk } from '@core/types';

describe('additional-drivers-macro.view', () => {
  const commonQueryParamsFn = jest.fn();
  const pathPrefix = 'test-path';
  const incrementYears = '4';

  let macroObject: MacroInputModel;
  let newRisk: Risk;

  const createDriver = (overrides = {}) => ({
    firstName: 'John',
    lastName: 'Doe',
    hasMedicalConditions: false,
    policyCancelled: false,
    unspentConvictions: false,
    personId: '5ac88b30-5f5b-4665-acdb-ecf5ffe5f1dd',
    dateOfBirth: '1988-12-30',
    relationshipStatus: {
      dataCode: 'S',
      displayText: 'Single',
    },
    relationshipToProposer: {
      dataCode: 'U',
      displayText: 'Other',
    },
    title: {
      dataCode: 'MR',
      displayText: 'Mr',
    },
    livedInUkSinceBirth: false,
    livedInUkFromDate: '2024-01-01',
    employmentStatus: {
      dataCode: 'U',
      displayText: 'Unemployed',
    },
    jobTitle: null,
    industry: null,
    studentType: null,
    driverVehicleLicensingAgencyAware: {
      dataCode: 'DVN',
      displayText: 'No',
    },
    licenceType: {
      dataCode: 'F',
      displayText: 'Full UK Car Licence',
    },
    licenceHeldFor: {
      dataCode: '0',
      displayText: 'Less than 1 Year',
    },
    drivingLicenceNumber: null,
    hasDrivingLicenceNumber: false,
    licenceIssueDate: '2024-01-01',
    useOfOtherVehicles: false,
    whatOtherVehicles: null,
    hasClaims: true,
    claims: [
      {
        type: {
          dataCode: 'A',
          displayText: 'Accident',
        },
        theftType: null,
        reason: null,
        incidentDate: '2024-02-01',
        typeOfDamage: {
          dataCode: '1',
          displayText: 'No Damage',
        },
        partyAtFault: {
          dataCode: 'B',
          displayText: 'Both parties',
        },
        cost: null,
        noClaimsDiscountAffected: false,
        claimedAgainstYourPolicy: false,
        driverId: '5ac88b30-5f5b-4665-acdb-ecf5ffe5f1dd',
        injuries: false,
      },
    ],
    convictions: [
      {
        type: {
          dataCode: 'CD',
          displayText: 'CD - Careless Driving',
        },
        reason: {
          dataCode: 'CD10',
          displayText: 'CD10 Driving Without Due Care And Attention',
        },
        date: '2024-01-01',
        pointsGiven: false,
        numberOfPoints: null,
        fineGiven: false,
        fineAmount: null,
        banGiven: false,
        banDuration: null,
        breathalysed: false,
      },
    ],
    hasConvictions: true,
    ...overrides,
  });

  beforeEach(() => {
    newRisk = cloneDeep(risk);
    macroObject = {
      viewName: 'additional-drivers-macro.view',
      product: 'car',
      viewModel: {
        isRenewal: false,
        incrementYears,
        risk: newRisk,
      },
      subPath: 'summary/your-policy',
      globalData: {
        commonQueryParams: commonQueryParamsFn,
        $path_prefix: pathPrefix,
      },
    };
  });

  describe('when there are no additional drivers', () => {
    it('should render "No additional drivers"', () => {
      macroObject.viewModel.risk.hasAdditionalDrivers = false;
      const { rendered } = renderMacro(macroObject);
      expect(rendered).toContain('<p>No additional drivers</p>');
    });
  });

  describe('when there is one additional driver', () => {
    it('should render additional driver details', () => {
      macroObject.viewModel.risk.additionalDrivers = [createDriver()];
      const { expectManyMacros } = renderMacro(macroObject);
      expectManyMacros('playbackContent', [
        [
          {
            id: 'additional-driver-about-1',
            heading: 'About John',
            tag: 'div',
            headingTag: 'h5',
            items: [
              { heading: 'Name', details: 'John Doe', pii: true },
              { heading: 'Date of birth', details: '1988-12-30', pii: true },
              { heading: 'Relationship status', details: 'Single', pii: false },
              { heading: 'Lived in the UK since birth', details: 'No', pii: false },
            ],
            editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#relationshipToProposer`,
          },
        ],
        // Add other expected macros here
      ]);
    });
  });

  describe('when there are multiple additional drivers', () => {
    it('should render multiple additional drivers', () => {
      macroObject.viewModel.risk.additionalDrivers = [createDriver(), createDriver({ firstName: 'Jane', personId: 'da7c86bd-b68a-4f7c-89d1-1063af343d65', dateOfBirth: '1990-01-01' })];
      const { expectManyMacros } = renderMacro(macroObject);
      expectManyMacros('playbackContent', [
        [
          {
            id: 'additional-driver-about-1',
            heading: 'About John',
            tag: 'div',
            headingTag: 'h5',
            items: [
              { heading: 'Name', details: 'John Doe', pii: true },
              { heading: 'Date of birth', details: '1988-12-30', pii: true },
              { heading: 'Relationship status', details: 'Single', pii: false },
              { heading: 'Lived in the UK since birth', details: 'No', pii: false },
            ],
            editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#relationshipToProposer`,
          },
        ],
        [
          {
            id: 'additional-driver-about-2',
            heading: 'About Jane',
            tag: 'div',
            headingTag: 'h5',
            items: [
              { heading: 'Name', details: 'Jane Doe', pii: true },
              { heading: 'Date of birth', details: '1990-01-01', pii: true },
              { heading: 'Relationship status', details: 'Single', pii: false },
              { heading: 'Lived in the UK since birth', details: 'Yes', pii: false },
            ],
            editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/2?${commonQueryParamsFn()}#relationshipToProposer`,
          },
        ],
        // Add other expected macros here
      ]);
    });
  });

  describe('when isRenewal is true', () => {
    it('should render additional driver details for renewal', () => {
      macroObject.viewModel.isRenewal = true;
      macroObject.viewModel.risk.additionalDrivers = [createDriver()];
      const { expectManyMacros } = renderMacro(macroObject);
      expectManyMacros('playbackContent', [
        [
          {
            id: 'additional-driver-about-1',
            heading: 'About John',
            tag: 'div',
            headingTag: 'h5',
            items: [
              { heading: 'Name', details: 'John Doe', pii: true },
              { heading: 'Date of birth', details: '1988-12-30', pii: true },
              { heading: 'Relationship status', details: 'Single', pii: false },
              { heading: 'Lived in the UK since birth', details: 'No', pii: false },
            ],
            editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#relationshipToProposer`,
          },
        ],
        // Add other expected macros here
      ]);
    });
  });
});
