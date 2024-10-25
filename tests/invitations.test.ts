import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

import SDK from '../src/sdk'
import type {
  Invitation,
  InvitationsPage
} from '../src/sdk'
enableFetchMocks()

const invitationsUrl = 'http://localhost'
const sdk = new SDK({ invitationsUrl })

describe('Invitations', () => {
  const invitation: Invitation = {
    invited_by: '886b4266-77d1-4258-abae-2931fb4f16de',
    user_id: '886b4266-77d1-4258-abae-2931fb4f16de',
    domain_id: '886b4266-77d1-4258-abae-2931fb4f16de'
  }

  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9'

  const userId = '886b4266-77d1-4258-abae-2931fb4f16de'

  const domainId = '886b4266-77d1-4258-abae-2931fb4f16de'

  const queryParams = {
    offset: 0,
    limit: 10
  }

  const invitationsPage: InvitationsPage = {
    invitations: [invitation],
    total: 1,
    offset: 0,
    limit: 10
  }

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('send invitation should send an invitation and return success', async () => {
    const SendInvitationResponse = {
      status: 200,
      message: 'Invitation sent successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(SendInvitationResponse))

    const response = await sdk.invitations.SendInvitation(invitation, token)
    expect(response).toEqual(SendInvitationResponse)
  })

  test('invitation should return an invitation and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(invitation))

    const response = await sdk.invitations.Invitation(userId, domainId, token)
    expect(response).toEqual(invitation)
  })

  test('invitations should return a list of invitations and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(invitationsPage))

    const response = await sdk.invitations.Invitations(queryParams, domainId, token)
    expect(response).toEqual(invitationsPage)
  })

  test('accept invitation should accept an invitation and return success', async () => {
    const AcceptInvitationResponse = {
      status: 200,
      message: 'Invitation accepted successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(AcceptInvitationResponse))

    const response = await sdk.invitations.AcceptInvitation(domainId, token)
    expect(response).toEqual(AcceptInvitationResponse)
  })

  test('delete invitation should delete an invitation and return success', async () => {
    const DeleteInvitationResponse = {
      status: 200,
      message: 'Invitation deleted successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(DeleteInvitationResponse))

    const response = await sdk.invitations.DeleteInvitation(userId, domainId, token)
    expect(response).toEqual(DeleteInvitationResponse)
  })
})
