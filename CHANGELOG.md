# @absmach/magistrala-sdk

## 0.9.1

### Patch Changes

- 287856d: add actions and members to roles

## 0.9.0

### Minor Changes

- a975a8e: Update the sdk to use the new access control by introducing roles

## 0.8.3

### Patch Changes

- 8f198fc: Add domainId to read messages

## 0.8.2

### Patch Changes

- 45fff20: Remove domain id in invitations file

## 0.8.1

### Patch Changes

- 963294e: Add permissions to User's struct

## 0.8.0

### Minor Changes

- 9845a4b: return name to pageMetadata

## 0.7.0

### Minor Changes

- e754d29: update users client to match Magistrala with new fields and functions

### Patch Changes

- e754d29: update createToken example
- e754d29: rename password back to secret in credentials
- e754d29: modify issue token function to use identity instead of username

## 0.6.3

### Patch Changes

- 43a05d9: remove domains prefix from domain users url

## 0.6.2

### Patch Changes

- 66fb8a4: move host url from sdk param to specific function param. This enables flexibility of the UI to allow for multitenancy
- 66fb8a4: add documentation

## 0.6.1

### Patch Changes

- c4f60b9: remove domains endpoints
- c4f60b9: update things, channels, groups, bootstrap, certs api endpoints to have domain id

## 0.6.0

### Minor Changes

- ac1b256: add service health check functionality

## 0.5.1

### Patch Changes

- 6574165: update documentation
- 6574165: Update remove user from domain to remove the need for relation

## 0.5.0

### Minor Changes

- 9bd2134: Add search endpoint to users

## 0.4.3

### Patch Changes

- a2611c4: Add id and tree to metadata

## 0.4.2

### Patch Changes

- 143a2be: this changeupdates the return messages, updates the channels in the bootstrapconfig to a string[]

## 0.4.1

### Patch Changes

- 4551043: return limit to channelsPage

## 0.4.0

### Minor Changes

- ff9865e: This update adds a new service, Journal service. Journal service is used to fetch historical events for specific entities.

### Patch Changes

- 313a777: update how channels are returned

## 0.3.11

### Patch Changes

- d1573bd: Add delete user functionality to users class
