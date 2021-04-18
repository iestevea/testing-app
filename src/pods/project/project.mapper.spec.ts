import * as commonMappers from 'common/mappers';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import * as projectMapper from "./project.mapper";
import { EmployeeSummary } from './project.vm';

jest.mock('common/mappers', () => ({
  mapToCollection: jest.fn(),
}))

describe('src/pods/project/project.mapper.spec.ts', () => {
  it('The method mapEmployeeSummaryFromApiToVm should return a copy of the object ', () => {
    // Arrange
    const employeeSummary: EmployeeSummary = {
      id: 'id-1',
      isAssigned: false,
      employeeName: 'employee 1'
    };
    // Act
    const result = projectMapper.mapEmployeeSummaryFromApiToVm(employeeSummary)

    // Assert
    expect(result).toEqual(employeeSummary);
  });

  it('The method mapEmployeeSummaryListFromApiToVm should call the method mapToCollection', () => {
    // Arrange
    const employeesArray: EmployeeSummary[] = [{
      id: 'id-1',
      isAssigned: false,
      employeeName: 'employee 1'
    }];

    // Act
    projectMapper.mapEmployeeSummaryListFromApiToVm(employeesArray);

    // Assert
    expect(commonMappers.mapToCollection).toHaveBeenCalled();
    expect(commonMappers.mapToCollection).toBeCalledTimes(1);
  });

  it('The method mapProjectFromApiToVm should return an empty project if the arg is falsy ', () => {
    // Arrange
    const emptyProject: viewModel.Project = viewModel.createEmptyProject();

    // Act
    const result: viewModel.Project = projectMapper.mapProjectFromApiToVm(undefined);

    // Assert
    expect(result).toEqual(emptyProject);
  });

  it('The method mapProjectFromApiToVm should return a mapped project if the argument is truthy and call the mapper of employees', () => {
    // Arrange
    const initialProject: apiModel.Project = {
      id: 'id-1',
      name: 'Nombre A',
      externalId: 'external-id-1',
      comments: 'comments',
      isActive: true,
      employees: [{
        id: 'id-1',
        isAssigned: false,
        employeeName: 'employee 1'
      }]
    }

    const mapEmployeeSummaryListFromApiToVmStub = jest.spyOn(projectMapper, 'mapEmployeeSummaryListFromApiToVm');

    // Act
    projectMapper.mapProjectFromApiToVm(initialProject);

    // Assert
    expect(mapEmployeeSummaryListFromApiToVmStub).toHaveBeenCalled();
  });
});
