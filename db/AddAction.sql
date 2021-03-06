DROP PROCEDURE [dbo].[AddAction]
GO

CREATE PROCEDURE [dbo].[AddAction]
(
	@id AS int = 0 OUTPUT,
	@code AS varchar(20) = '',
	@action_name AS varchar(100) = '',
	@description AS varchar(200) = '',
	@action_type_id AS int = 0, 
	@application_id AS int = 0, 
	@position AS int = 0, 
	@status_code_id AS int = 10,
	@rights as varchar(100) = '',

    @action as tinyint = 10, /* 20 = insert; 10 = update; 0 = delete;*/
    @visit_id as bigint = 0,
    @action_status_id as int = 0 OUTPUT,
    @action_msg as varchar(200) = '' OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @user_id AS int = dbo.F_VisitUserID(@visit_id)
	DECLARE @this_module_id AS int = 2

	SET @action_msg = ''
	SET @action_status_id = 0

	IF NOT @action IN (0, 10, 20)
		SET @action_status_id = -250 /* invalid request*/

	IF @action_status_id >= 0 AND (@user_id < 1 or not exists (SELECT * from users WHERE [id] = @user_id) ) AND exists (SELECT * from users WHERE [id] > 0) /* skip during DB initialisation */
		SET @action_status_id = -15 /* not logged in*/

	IF @action_status_id < 0 GOTO DONE

	IF @action = 0
	BEGIN
		--DELETE actions WHERE id = @id
		SET @action_status_id = -1
		SET @action_msg = 'Deletion disabled, refer to AddAction stored procedure.'
		goto DONE
	END 
	ELSE IF @action = 10 and @id > 0
	BEGIN

		UPDATE actions SET 
			code = @code, 
			action = @action_name, 
			description = @description,
			action_type_id = @action_type_id,
			position = @position,
			status_code_id = @status_code_id, 
			update_visit_id = @visit_id, 
			updated_at = getdate() 
		WHERE [id] = @id       

		EXEC AddActionRights @action_id=@id, @rights_ids=@rights

	END /* exists*/
	ELSE IF @action = 20 and @id = 0
	BEGIN

		INSERT INTO actions (
			code,
			action, 
			description,
			action_type_id,
			position,
			application_id,
			status_code_id,
			insert_visit_id, 
			inserted_at, 
			update_visit_id, 
			updated_at
		) VALUES ( 
			@code,
			@action_name, 
			@description,
			@action_type_id,
			@position,
			@application_id,
			@status_code_id,
			@visit_id, 
			getdate(), 
			@visit_id, 
			GETDATE()
		)

		SET @id = cast(scope_identity() AS int)

		EXEC AddActionRights @action_id=@id, @rights_ids=@rights

	END 

DONE:
	/*IF @action_status_id < 0
	BEGIN
		DECLARE @error_log_id AS int
		EXEC LogError @error_log_id OUTPUT, @action_status_id, '', 0, @visit_id 
		SET @action_msg = dbo.F_GetErrorLog(@error_log_id)
	END */
END
