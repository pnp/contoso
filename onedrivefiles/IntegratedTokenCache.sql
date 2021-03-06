/****** Object:  Table [dbo].[MsalAccountActivities]    Script Date: 4/05/2021 13:41:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MsalAccountActivities](
	[AccountCacheKey] [nvarchar](450) NOT NULL,
	[AccountIdentifier] [nvarchar](max) NULL,
	[AccountObjectId] [nvarchar](max) NULL,
	[AccountTenantId] [nvarchar](max) NULL,
	[UserPrincipalName] [nvarchar](max) NULL,
	[LastActivity] [datetime2](7) NOT NULL,
	[FailedToAcquireToken] [bit] NOT NULL,
	[SubscriptionId] [nvarchar](max) NULL,
 CONSTRAINT [PK_MsalAccountActivities] PRIMARY KEY CLUSTERED 
(
	[AccountCacheKey] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubscriptionActivities]    Script Date: 4/05/2021 13:41:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubscriptionActivities](
	[AccountObjectId] [nvarchar](450) NOT NULL,
	[AccountTenantId] [nvarchar](450) NOT NULL,
	[UserPrincipalName] [nvarchar](450) NOT NULL,
	[SubscriptionId] [nvarchar](max) NOT NULL,
	[LastChangeToken] [nvarchar](max) NULL,
 CONSTRAINT [PK_SubscriptionActivities] PRIMARY KEY CLUSTERED 
(
	[AccountObjectId] ASC,
	[AccountTenantId] ASC,
	[UserPrincipalName] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TokenCache]    Script Date: 4/05/2021 13:41:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TokenCache](
	[Id] [nvarchar](449) NOT NULL,
	[Value] [varbinary](max) NOT NULL,
	[ExpiresAtTime] [datetimeoffset](7) NOT NULL,
	[SlidingExpirationInSeconds] [bigint] NULL,
	[AbsoluteExpiration] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
