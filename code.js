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

  it('should render "No additional drivers" when there are no no additional drivers', () => {
    macroObject.viewModel.risk.hasAdditionalDrivers = false;
    const { rendered } = renderMacro(macroObject);

    expect(rendered).toContain('<p>No additional drivers</p>');
  });

  it('should render additional driver details when there is one driver', () => {
    macroObject.viewModel.risk.additionalDrivers = [
      {
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
      },
    ];

    const { expectManyMacros } = renderMacro(macroObject);

    expectManyMacros('playbackContent', [
      [
        {
          id: 'additional-driver-about-1',
          heading: 'About John',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Name',
              details: 'John Doe',
              pii: true,
            },
            {
              heading: 'Date of birth',
              details: '1988-12-30',
              pii: true,
            },
            {
              heading: 'Relationship status',
              details: 'Single',
              pii: false,
            },
            {
              heading: 'Lived in the UK since birth',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#relationshipToProposer`,
        },
      ],
      [
        {
          id: 'additional-driver-employment-1',
          heading: 'John employment',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Employment status',
              details: 'Unemployed',
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#employmentStatus`,
        },
      ],
      [
        {
          id: 'additional-driver-licence-1',
          heading: 'John licence',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Licence type',
              details: 'Full UK Car Licence',
              pii: false,
            },
            {
              heading: 'Licence held for',
              details: 'Less than 1 Year',
              pii: false,
              highlightedContent: '',
              highlightedContentId: '',
              highlightedContentHidden: false,
            },
            {
              heading: 'Driving licence number',
              details: 'Not provided',
              pii: true,
              detailsClass: 'text-uppercase',
            },
            {
              heading: 'Licence valid from',
              details: '2024-01-01',
              pii: false,
            },
            {
              heading: 'Access to other vehicles',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#licenceType`,
        },
      ],
      [
        {
          id: 'additional-driver-licence-restrictions-1',
          heading: 'John licence restrictions',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'DVLA reportable conditions',
              details: 'No',
              pii: false,
            },
            {
              heading: 'Had insurance denied before',
              details: 'No',
              pii: false,
            },
            {
              heading: 'Unspent non-motoring convictions',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#hasMedicalConditions`,
        },
      ],
      [
        {
          id: 'driver-claims-1',
          heading: 'John claims in the last 5 years',
          editActionHref: `test-path/car/questions/additional-drivers/edit/1/claims-convictions?${commonQueryParamsFn()}`,
        },
      ],
      [
        {
          id: 'driver-convictions-1',
          heading: 'John motoring convictions in the last 5 years',
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1/claims-convictions?${commonQueryParamsFn()}`,
        },
      ],
    ]);
  });

  it('should render multiple additional drivers', () => {
    macroObject.viewModel.risk.additionalDrivers = [
      {
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
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        hasMedicalConditions: false,
        policyCancelled: false,
        unspentConvictions: false,
        personId: 'da7c86bd-b68a-4f7c-89d1-1063af343d65',
        dateOfBirth: '1990-01-01',
        relationshipStatus: {
          dataCode: 'S',
          displayText: 'Single',
        },
        relationshipToProposer: {
          dataCode: 'U',
          displayText: 'Other',
        },
        title: {
          dataCode: 'MS',
          displayText: 'Ms',
        },
        livedInUkSinceBirth: true,
        livedInUkFromDate: null,
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
          dataCode: 'E',
          displayText: 'Full EU Licence',
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
        hasClaims: false,
        hasConvictions: false,
        claims: [],
        convictions: [],
      },
    ];

    const { expectManyMacros } = renderMacro(macroObject);

    expectManyMacros('playbackContent', [
      [
        {
          id: 'additional-driver-about-1',
          heading: 'About John',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Name',
              details: 'John Doe',
              pii: true,
            },
            {
              heading: 'Date of birth',
              details: '1988-12-30',
              pii: true,
            },
            {
              heading: 'Relationship status',
              details: 'Single',
              pii: false,
            },
            {
              heading: 'Lived in the UK since birth',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#relationshipToProposer`,
        },
      ],
      [
        {
          id: 'additional-driver-employment-1',
          heading: 'John employment',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Employment status',
              details: 'Unemployed',
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#employmentStatus`,
        },
      ],
      [
        {
          id: 'additional-driver-licence-1',
          heading: 'John licence',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Licence type',
              details: 'Full UK Car Licence',
              pii: false,
            },
            {
              heading: 'Licence held for',
              details: 'Less than 1 Year',
              pii: false,
              highlightedContent: '',
              highlightedContentId: '',
              highlightedContentHidden: false,
            },
            {
              heading: 'Driving licence number',
              details: 'Not provided',
              pii: true,
              detailsClass: 'text-uppercase',
            },
            {
              heading: 'Licence valid from',
              details: '2024-01-01',
              pii: false,
            },
            {
              heading: 'Access to other vehicles',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#licenceType`,
        },
      ],
      [
        {
          id: 'additional-driver-licence-restrictions-1',
          heading: 'John licence restrictions',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'DVLA reportable conditions',
              details: 'No',
              pii: false,
            },
            {
              heading: 'Had insurance denied before',
              details: 'No',
              pii: false,
            },
            {
              heading: 'Unspent non-motoring convictions',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#hasMedicalConditions`,
        },
      ],
      [
        {
          id: 'driver-claims-1',
          heading: 'John claims in the last 5 years',
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1/claims-convictions?${commonQueryParamsFn()}`,
        },
      ],
      [
        {
          id: 'driver-convictions-1',
          heading: 'John motoring convictions in the last 5 years',
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1/claims-convictions?${commonQueryParamsFn()}`,
        },
      ],

      [
        {
          id: 'additional-driver-about-2',
          heading: 'About Jane',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Name',
              details: 'Jane Doe',
              pii: true,
            },
            {
              heading: 'Date of birth',
              details: '1990-01-01',
              pii: true,
            },
            {
              heading: 'Relationship status',
              details: 'Single',
              pii: false,
            },
            {
              heading: 'Lived in the UK since birth',
              details: 'Yes',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/2?${commonQueryParamsFn()}#relationshipToProposer`,
        },
      ],
      [
        {
          id: 'additional-driver-employment-2',
          heading: 'Jane employment',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Employment status',
              details: 'Unemployed',
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/2?${commonQueryParamsFn()}#employmentStatus`,
        },
      ],
      [
        {
          id: 'additional-driver-licence-2',
          heading: 'Jane licence',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Licence type',
              details: 'Full EU Licence',
              pii: false,
            },
            {
              heading: 'Licence held for',
              details: 'Less than 1 Year',
              pii: false,
              highlightedContent: '',
              highlightedContentId: '',
              highlightedContentHidden: false,
            },
            {
              heading: 'Driving licence number',
              details: 'Not provided',
              pii: true,
              detailsClass: 'text-uppercase',
            },
            {
              heading: 'Licence valid from',
              details: '2024-01-01',
              pii: false,
            },
            {
              heading: 'Access to other vehicles',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/2?${commonQueryParamsFn()}#licenceType`,
        },
      ],
      [
        {
          id: 'additional-driver-licence-restrictions-2',
          heading: 'Jane licence restrictions',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'DVLA reportable conditions',
              details: 'No',
              pii: false,
            },
            {
              heading: 'Had insurance denied before',
              details: 'No',
              pii: false,
            },
            {
              heading: 'Unspent non-motoring convictions',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/2?${commonQueryParamsFn()}#hasMedicalConditions`,
        },
      ],
      [
        {
          id: 'driver-claims-2',
          heading: 'Jane claims in the last 5 years',
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/2/claims-convictions?${commonQueryParamsFn()}`,
        },
      ],
      [
        {
          id: 'driver-convictions-2',
          heading: 'Jane motoring convictions in the last 5 years',
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/2/claims-convictions?${commonQueryParamsFn()}`,
        },
      ],
    ]);
  });

  it('should render additional driver details when isRenewal is true', () => {
    macroObject.viewModel.isRenewal = true;
    macroObject.viewModel.risk.additionalDrivers = [
      {
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
      },
    ];

    const { expectManyMacros } = renderMacro(macroObject);

    expectManyMacros('playbackContent', [
      [
        {
          id: 'additional-driver-about-1',
          heading: 'About John',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Name',
              details: 'John Doe',
              pii: true,
            },
            {
              heading: 'Date of birth',
              details: '1988-12-30',
              pii: true,
            },
            {
              heading: 'Relationship status',
              details: 'Single',
              pii: false,
            },
            {
              heading: 'Lived in the UK since birth',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#relationshipToProposer`,
        },
      ],
      [
        {
          id: 'additional-driver-employment-1',
          heading: 'John employment',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Employment status',
              details: 'Unemployed',
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
            {
              heading: '',
              details: undefined,
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#employmentStatus`,
        },
      ],
      [
        {
          id: 'additional-driver-licence-1',
          heading: 'John licence',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'Licence type',
              details: 'Full UK Car Licence',
              pii: false,
            },
            {
              heading: 'Licence held for',
              details: 'Less than 1 Year',
              pii: false,
              highlightedContent: 'We’ve added 4 to John licence.',
              highlightedContentId:
                'additionalDrivers[0].licenceHeldFor-playback',
              highlightedContentHidden: true,
            },
            {
              heading: 'Driving licence number',
              details: 'Not provided',
              pii: true,
              detailsClass: 'text-uppercase',
            },
            {
              heading: 'Licence valid from',
              details: '2024-01-01',
              pii: false,
            },
            {
              heading: 'Access to other vehicles',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#licenceType`,
        },
      ],
      [
        {
          id: 'additional-driver-licence-restrictions-1',
          heading: 'John licence restrictions',
          tag: 'div',
          headingTag: 'h5',
          items: [
            {
              heading: 'DVLA reportable conditions',
              details: 'No',
              pii: false,
            },
            {
              heading: 'Had insurance denied before',
              details: 'No',
              pii: false,
            },
            {
              heading: 'Unspent non-motoring convictions',
              details: 'No',
              pii: false,
            },
          ],
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1?${commonQueryParamsFn()}#hasMedicalConditions`,
        },
      ],
      [
        {
          id: 'driver-claims-1',
          heading: 'John claims in the last 5 years',
          editActionHref: `test-path/car/questions/additional-drivers/edit/1/claims-convictions?${commonQueryParamsFn()}`,
        },
      ],
      [
        {
          id: 'driver-convictions-1',
          heading: 'John motoring convictions in the last 5 years',
          editActionHref: `${pathPrefix}/car/questions/additional-drivers/edit/1/claims-convictions?${commonQueryParamsFn()}`,
        },
      ],
    ]);
  });
});
